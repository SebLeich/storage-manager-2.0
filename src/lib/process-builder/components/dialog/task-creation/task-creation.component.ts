import { Component, Inject, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, NEVER, Observable, Subscription } from 'rxjs';
import { ITaskCreationConfig } from 'src/lib/process-builder/interfaces/task-creation-config.interface';
import { TaskCreationStep } from 'src/lib/process-builder/globals/task-creation-step';
import { selectIFunction } from 'src/lib/process-builder/store/selectors/function.selector';
import { IFunction } from 'src/lib/process-builder/interfaces/function.interface';
import { selectIParam, selectIParamByNormalizedName } from 'src/lib/process-builder/store/selectors/param.selectors';
import { IParam } from 'src/lib/process-builder/interfaces/param.interface';
import { CodemirrorRepository } from 'src/lib/core/codemirror.repository';
import { MethodEvaluationStatus } from 'src/lib/process-builder/globals/method-evaluation-status';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/process-builder-config.interface';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { selectIInterface } from 'src/lib/process-builder/store/selectors/interface.selectors';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { ITaskCreationFormGroup } from 'src/lib/process-builder/interfaces/task-creation.interface';
import { IParamDefinition } from 'src/lib/process-builder/interfaces/param-definition.interface';
import { GatewayType } from 'src/lib/process-builder/types/gateway.type';
import { ParamCodes } from 'src/config/param-codes';
import STEP_REGISTRY from './constants/step-registry.constant';
import { functionSelectedsWhenRequiredValidator } from './validators/function-exists-when-required.validator';
import { implementationExistsWhenRequiredValidator } from './validators/implementation-exists-when-required.validator';
import { ITaskCreationDataWrapper } from 'src/lib/process-builder/interfaces/task-creation-data-wrapper.interface';

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
    implementation: new FormControl<string[] | null>(null),
    inputParam: new FormControl<ParamCodes[] | number | null>(null),
    interface: new FormControl<number | null>(null),
    isProcessOutput: new FormControl<boolean>(false),
    name: new FormControl<string>(''),
    normalizedOutputParamName: new FormControl<string>(''),
    normalizedName: new FormControl<string>(''),
    outputParamName: new FormControl<string>(''),
    outputParamValue: new FormControl<IParam | IParamDefinition[] | null>(null),
    requireCustomImplementation: new FormControl<boolean>(false),
  }, Validators.compose([
    functionSelectedsWhenRequiredValidator(this.data?.taskCreationPayload?.configureActivity ? true : false),
    implementationExistsWhenRequiredValidator
  ])) as FormGroup<ITaskCreationFormGroup>;

  public customEvaluationResult$ = this.formGroup.controls
    .implementation
    .valueChanges
    .pipe(debounceTime(2000), map(implementation => CodemirrorRepository.evaluateCustomMethod(undefined, implementation ?? undefined)));

  public usedInputParams$ = this.formGroup.controls
    .implementation
    .valueChanges
    .pipe(debounceTime(2000), map(implementation => {
      if (!implementation) {
        return null;
      }
      return CodemirrorRepository.getUsedInputParams(undefined, implementation ?? undefined)
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
        let val = formValue.requireCustomImplementation || formValue.implementation ? true : false;
        return val;
      }),
      distinctUntilChanged()
    );

  public selectedFunction$: Observable<IFunction | null | undefined> = this._store.select(selectIFunction(() => this.formGroup.controls.functionIdentifier.value));

  public hasDynamicInputParameters$ = this.selectedFunction$
    .pipe(
      map(selectedFunction => selectedFunction?.useDynamicInputParams && !(selectedFunction.requireCustomImplementation || selectedFunction.customImplementation) ? true : false),
      distinctUntilChanged()
    );

  public hasDynamicOutputParameters$ = this.selectedFunction$
    .pipe(
      map(selectedFunction => selectedFunction?.output?.param === 'dynamic' ? true : false),
      distinctUntilChanged()
    );

  public hasDataMapping$ = this.selectedFunction$
    .pipe(
      map(selectedFunction => selectedFunction?.requireDataMapping ?? false),
      distinctUntilChanged()
    );

  public steps$ = combineLatest([this.hasCustomImplementation$, this.hasDynamicInputParameters$, this.hasDataMapping$])
    .pipe(
      map(([hasCustomImplementation, hasDynamicInputParameters, hasDataMapping]) => this.getSteps([hasDynamicInputParameters, hasCustomImplementation, hasDataMapping]))
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
    this.formGroup.patchValue(this.data.taskCreationData as any, { emitEvent: true });
  }

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
        this.formGroup.statusChanges.subscribe(status => console.log(status, this.formGroup.errors)),
        this.formGroup.controls.functionIdentifier.valueChanges.subscribe(
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
    const currentFunction = await selectSnapshot(this._store.select(selectIFunction(this.formGroup.controls.functionIdentifier.value)));
    if (currentFunction) {
      const outputParam = await selectSnapshot(this._store.select(selectIParam(currentFunction?.output?.param))),
        outputParamInterface = await selectSnapshot(this._store.select(selectIInterface(currentFunction?.output?.interface)));

      const inputParams = currentFunction.useDynamicInputParams && currentFunction.inputParams ? Array.isArray(currentFunction.inputParams) ? [...currentFunction.inputParams] : [currentFunction.inputParams] : [];
      let outputParamValue = currentFunction.output?.param === 'dynamic' && outputParamInterface ? outputParamInterface.typeDef : outputParam?.typeDef, objectTypeDefinition: IParam | IParamDefinition[] | null;
      if (outputParamValue) {
        if (Array.isArray(outputParamValue)) {
          objectTypeDefinition = outputParamValue;
        } else {
          objectTypeDefinition = await selectSnapshot(this._store.select(selectIParamByNormalizedName(outputParamValue.normalizedName)));
        }
      } else {
        objectTypeDefinition = null;
      }

      this.formGroup.patchValue({
        canFail: currentFunction.canFail,
        implementation: currentFunction.customImplementation,
        requireCustomImplementation: currentFunction.requireCustomImplementation,
        name: currentFunction.name,
        normalizedName: currentFunction.normalizedName,
        normalizedOutputParamName: outputParam?.normalizedName,
        outputParamName: outputParam?.name,
        outputParamValue: objectTypeDefinition,
        inputParam: inputParams.length === 1 ? inputParams[0].param : null,
      });
    }
  }

  private renderStep(step: ITaskCreationConfig) {
    this.dynamicInner.clear();
    const stepConfiguration = STEP_REGISTRY.get(step.taskCreationStep);
    if (!stepConfiguration) {
      throw (`no config found for step ${step.taskCreationStep}`);
    }

    const component = this.dynamicInner.createComponent(stepConfiguration!.type);
    if (typeof stepConfiguration.provideInputParams === 'function') {
      stepConfiguration.provideInputParams!(component.instance, step.element);
    }
  }

  private getSteps([hasDynamicInputParam, hasCustomImplementation, hasDataMapping]: boolean[]) {
    let availableSteps: ITaskCreationConfig[] = [];
    if (this.data) {
      const gateway = this.data?.taskCreationPayload?.configureIncomingErrorGatewaySequenceFlow;
      if (gateway) {
        availableSteps.push({
          taskCreationStep: TaskCreationStep.ConfigureErrorGatewayEntranceConnection,
          element: gateway,
          autoProceed$: this.formGroup.controls.entranceGatewayType.valueChanges.pipe(
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
    }
    return availableSteps;
  }

  public TaskCreationStep = TaskCreationStep;

  public get implementationControl(): FormControl<string[] | null> {
    return this.formGroup.controls['implementation'];
  }
}

