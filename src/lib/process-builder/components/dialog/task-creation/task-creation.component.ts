import { Component, Inject, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, NEVER, Observable, Subscription } from 'rxjs';
import { ITaskCreationConfig } from 'src/lib/process-builder/interfaces/task-creation-config.interface';
import { TaskCreationStep } from 'src/lib/process-builder/globals/task-creation-step';
import { selectIFunction, selectIInterface, selectIParam, selectIParamByNormalizedName } from '@process-builder/selectors';
import { IFunction, IParam, IParamDefinition } from '@process-builder/interfaces';
import { CodemirrorRepository } from 'src/lib/core/codemirror.repository';
import { MethodEvaluationStatus } from 'src/lib/process-builder/globals/method-evaluation-status';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/process-builder-config.interface';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, throttleTime } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { GatewayType } from 'src/lib/process-builder/types/gateway.type';
import { ParamCodes } from 'src/config/param-codes';
import STEP_REGISTRY from './constants/step-registry.constant';
import { functionSelectedsWhenRequiredValidator } from './validators/function-exists-when-required.validator';
import { implementationExistsWhenRequiredValidator } from './validators/implementation-exists-when-required.validator';
import { ITaskCreationDataWrapper } from 'src/lib/process-builder/interfaces/task-creation-data-wrapper.interface';
import defaultImplementation from 'src/lib/process-builder/globals/default-implementation';
import { ITextLeaf } from 'src/lib/process-builder/interfaces/text-leaf.interface';

@Component({
  selector: 'app-task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.scss'],
})
export class TaskCreationComponent implements OnDestroy, OnInit {
  @ViewChild('dynamicInner', { static: true, read: ViewContainerRef }) private dynamicInner!: ViewContainerRef;

  public formGroup = new FormGroup({
    canFail: new FormControl<boolean>(false),
    entranceGatewayType: new FormControl<GatewayType | null>(null),
    functionIdentifier: new FormControl<number | null>(null),
    implementation: new FormControl<ITextLeaf | null>(null),
    inputParam: new FormControl<ParamCodes[] | number | null>(null),
    interface: new FormControl<string | null>(null),
    isProcessOutput: new FormControl<boolean>(false),
    name: new FormControl<string>(''),
    normalizedOutputParamName: new FormControl<string>(''),
    normalizedName: new FormControl<string>(''),
    outputParamName: new FormControl<string>(''),
    outputParamValue: new FormControl<IParam | IParamDefinition[] | null>(null),
    requireCustomImplementation: new FormControl<boolean>(false)
  }, Validators.compose([
    functionSelectedsWhenRequiredValidator(this.data?.taskCreationPayload?.configureActivity ? true : false),
    implementationExistsWhenRequiredValidator
  ]));

  public customEvaluationResult$ = this.formGroup.controls.implementation.valueChanges
    .pipe(throttleTime(2000), map(implementation => CodemirrorRepository.evaluateCustomMethod(undefined, implementation?.text ?? [])));

  public unableToDetermineOutputParam$ = this.customEvaluationResult$.pipe(
    map(evaluationResult => {
      if (evaluationResult && evaluationResult.status === MethodEvaluationStatus.ReturnValueFound && !evaluationResult.type) {
        return true;
      }
      return false;
    }),
    startWith(false)
  );

  public usedInputParams$ = this.formGroup.controls.implementation.valueChanges
    .pipe(debounceTime(2000), map(implementation => {
      if (!implementation) {
        return null;
      }
      return CodemirrorRepository.getUsedInputParams(undefined, implementation.text ?? undefined)
        .map((x) => x.propertyName)
        .filter((x, index, array) => array.indexOf(x) === index);
    }));

  public hasOutputParam$ = this.customEvaluationResult$.pipe(map(evaluationResult => evaluationResult.status === MethodEvaluationStatus.ReturnValueFound));

  public statusMessage$ = this.usedInputParams$.pipe(map(inputParams => {
    if (!inputParams) {
      return 'no input params used';
    }
    `input params: ${inputParams.length === 0 ? '-' : inputParams.join(', ')}`;
  }));

  private _currentStepIndex: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public currentStepIndex$ = this._currentStepIndex.asObservable();

  private _formValue$ = this.formGroup.valueChanges.pipe(startWith(this.formGroup.value));

  public hasCustomImplementation$ = this._formValue$
    .pipe(
      map((formValue) => {
        const hasCustomImplementation = formValue.requireCustomImplementation || formValue.implementation ? true : false;
        return hasCustomImplementation;
      }),
      distinctUntilChanged()
    );

  public selectedFunction$: Observable<IFunction | null | undefined> = this._store.select(selectIFunction(() => this.formGroup.controls.functionIdentifier?.value));

  public hasDynamicInputParameters$ = this.selectedFunction$
    .pipe(
      map(selectedFunction => selectedFunction?.inputTemplates === 'dynamic' && !(selectedFunction.requireCustomImplementation || selectedFunction.customImplementation) ? true : false),
      distinctUntilChanged()
    );

  public hasDynamicOutputParameters$ = this.selectedFunction$
    .pipe(
      map(selectedFunction => selectedFunction?.outputTemplate === 'dynamic' ? true : false),
      distinctUntilChanged()
    );

  public hasDataMapping$ = this.selectedFunction$
    .pipe(
      map(selectedFunction => selectedFunction?.requireDataMapping ?? false),
      distinctUntilChanged()
    );

  public steps$ = combineLatest([this.hasCustomImplementation$, this.hasDynamicInputParameters$, this.hasDataMapping$, this.unableToDetermineOutputParam$])
    .pipe(
      map(([hasCustomImplementation, hasDynamicInputParameters, hasDataMapping, unableToDetermineOutputParam]) => this.getSteps([hasDynamicInputParameters, hasCustomImplementation, hasDataMapping, unableToDetermineOutputParam]))
    );

  public currentStep$ = combineLatest([this.steps$, this.currentStepIndex$]).pipe(
    map(([steps, index]) => steps[index]),
    filter(step => step ? true : false),
    distinctUntilChanged((prev, curr) => prev.taskCreationStep === curr.taskCreationStep)
  );
  public hasPreviousStep$ = this.currentStepIndex$.pipe(map(index => index > 0));
  public hasNextStep$ = combineLatest([this.steps$, this.currentStepIndex$]).pipe(map(([steps, index]) => index < steps.length - 1));
  public canAnalyzeCustomImplementation$ = this.currentStep$.pipe(
    filter((x) => (x ? true : false)),
    map((x) => x.taskCreationStep === TaskCreationStep.ConfigureFunctionImplementation || x.taskCreationStep === TaskCreationStep.ConfigureFunctionOutput)
  );

  public stepToNextStep$: Observable<number> = this.currentStep$.pipe(switchMap(step => step?.autoProceed$ ?? NEVER)) as Observable<number>;

  public formInvalid$ = this.formGroup.statusChanges.pipe(map(status => status === 'INVALID'), startWith(this.formGroup.status));

  private _subscription = new Subscription();

  constructor(
    @Inject(PROCESS_BUILDER_CONFIG_TOKEN) public config: IProcessBuilderConfig,
    @Inject(MAT_DIALOG_DATA) public data: ITaskCreationDataWrapper,
    private _ref: MatDialogRef<TaskCreationComponent>,
    private _store: Store
  ) {
    this.formGroup.patchValue(this.data.taskCreationFormGroupValue, { emitEvent: true });
  }

  public abort = () => this._ref.close();

  public finish = () => this._ref.close(this.formGroup.value);

  public async nextStep() {
    const stepIndex = await firstValueFrom(this.currentStepIndex$);
    this.setStep(stepIndex + 1);
  }

  public async previousStep() {
    const stepIndex = await firstValueFrom(this.currentStepIndex$);
    this.setStep(stepIndex - 1);
  }

  public ngOnDestroy = () => this._subscription.unsubscribe();

  public ngOnInit(): void {

    this.validateFunctionSelection();
    this.setStep(0);

    this._subscription.add(
      ...[
        this.formGroup.controls.functionIdentifier?.valueChanges.subscribe(
          (functionIdentifier: number | null) => {
            if (typeof functionIdentifier !== 'number') {
              return;
            }

            this.validateFunctionSelection();
          }
        ),
        this.currentStep$.subscribe(step => this.renderStep(step)),
        this.stepToNextStep$.subscribe((stepIndex: number) => this.setStep(stepIndex + 1))
      ]
    );
  }

  public setStep(index: number) {
    this._currentStepIndex.next(index);
  }

  public async validateFunctionSelection() {
    const currentFunction = await selectSnapshot(this._store.select(selectIFunction(this.formGroup.controls.functionIdentifier?.value)));
    if (currentFunction) {
      const outputParam = await selectSnapshot(this._store.select(selectIParam(currentFunction?.output))),
        outputParamInterface = await selectSnapshot(this._store.select(selectIInterface(currentFunction?.outputTemplate as string)));

      const inputParams = currentFunction?.inputTemplates === 'dynamic' && currentFunction.inputTemplates ? Array.isArray(currentFunction.inputTemplates) ? [...currentFunction.inputTemplates] : [currentFunction.inputTemplates] : [];
      const outputParamValue = currentFunction?.outputTemplate === 'dynamic' && outputParamInterface ? outputParamInterface.typeDef : outputParam?.typeDef;
      let objectTypeDefinition: IParam | IParamDefinition[] | null;
      if (outputParamValue) {
        if (Array.isArray(outputParamValue)) {
          objectTypeDefinition = outputParamValue;
        } else {
          objectTypeDefinition = await selectSnapshot(this._store.select(selectIParamByNormalizedName(outputParamValue.normalizedName)));
        }
      } else {
        objectTypeDefinition = null;
      }

      const textLeaf = CodemirrorRepository.stringToTextLeaf(currentFunction.customImplementation ?? defaultImplementation);
      this.formGroup.patchValue({
        canFail: currentFunction.canFail,
        implementation: textLeaf,
        requireCustomImplementation: currentFunction.requireCustomImplementation,
        name: currentFunction.name,
        normalizedName: currentFunction.normalizedName,
        normalizedOutputParamName: outputParam?.normalizedName,
        interface: outputParam?.interface,
        outputParamName: outputParam?.name,
        outputParamValue: objectTypeDefinition,
        inputParam: inputParams.length === 1 ? inputParams[0].interface : null,
      });
    }
  }

  private renderStep(step: ITaskCreationConfig) {
    this.dynamicInner.clear();
    const stepConfiguration = STEP_REGISTRY.get(step.taskCreationStep);
    if (!stepConfiguration) {
      throw (`no config found for step ${step.taskCreationStep}`);
    }

    const component = this.dynamicInner.createComponent(stepConfiguration.type);
    if (typeof stepConfiguration.provideInputParams === 'function') {
      stepConfiguration.provideInputParams(component.instance, step.element);
    }
  }

  private getSteps([hasDynamicInputParam, hasCustomImplementation, hasDataMapping, unableToDetermineOutputParam]: boolean[]) {
    const availableSteps: ITaskCreationConfig[] = [];
    if (this.data) {
      const gateway = this.data?.taskCreationPayload?.configureIncomingErrorGatewaySequenceFlow;
      if (gateway) {
        availableSteps.push({
          taskCreationStep: TaskCreationStep.ConfigureErrorGatewayEntranceConnection,
          element: gateway,
          autoProceed$: this.formGroup.controls.entranceGatewayType?.valueChanges.pipe(
            switchMap(() => this.steps$),
            filter(steps => steps.length > 1),
            map((steps) => {
              const index = steps.findIndex(step => step.taskCreationStep === TaskCreationStep.ConfigureErrorGatewayEntranceConnection);
              return index;
            })
          )
        } as ITaskCreationConfig);
      }

      const activity = this.data?.taskCreationPayload?.configureActivity;
      if (activity) {
        availableSteps.push({ taskCreationStep: TaskCreationStep.ConfigureFunctionSelection, element: activity } as ITaskCreationConfig);

        if (hasDynamicInputParam) {
          availableSteps.push({ taskCreationStep: TaskCreationStep.ConfigureFunctionInput, element: activity } as ITaskCreationConfig);
        }

        if (hasCustomImplementation) {
          availableSteps.push({ taskCreationStep: TaskCreationStep.ConfigureFunctionImplementation, element: activity } as ITaskCreationConfig);
        }

        if (hasDataMapping) {
          availableSteps.push({ taskCreationStep: TaskCreationStep.ConfigureInputOutputMapping, element: activity } as ITaskCreationConfig);
        }
      }

      if (unableToDetermineOutputParam) {
        availableSteps.push({ taskCreationStep: TaskCreationStep.ConfigureFunctionOutput } as ITaskCreationConfig);
      }
    }
    return availableSteps;
  }

  public TaskCreationStep = TaskCreationStep;
}

