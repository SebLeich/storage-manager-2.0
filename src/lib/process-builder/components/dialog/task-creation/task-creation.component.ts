import { Component, Inject, OnDestroy, OnInit, ViewChild, ViewContainerRef, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { combineLatest, NEVER, Observable, Subscription } from 'rxjs';
import { ITaskCreationConfig } from 'src/lib/process-builder/interfaces/task-creation-config.interface';
import { TaskCreationStep } from 'src/lib/process-builder/globals/task-creation-step';
import { selectIFunction, selectIInterface, selectIParam, selectIParamByNormalizedName } from '@process-builder/selectors';
import { IFunction, IParam, IParamDefinition } from '@process-builder/interfaces';
import { CodemirrorRepository } from 'src/lib/core/codemirror.repository';
import { MethodEvaluationStatus } from 'src/lib/process-builder/globals/method-evaluation-status';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/process-builder-config.interface';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, throttleTime } from 'rxjs/operators';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { GatewayType } from 'src/lib/process-builder/types/gateway.type';
import { ParamCodes } from 'src/config/param-codes';
import STEP_REGISTRY from './constants/step-registry.constant';
import { functionSelectedsWhenRequiredValidator } from './validators/function-exists-when-required.validator';
import { implementationExistsWhenRequiredValidator } from './validators/implementation-exists-when-required.validator';
import { ITaskCreationDataWrapper } from 'src/lib/process-builder/interfaces/task-creation-data-wrapper.interface';
import defaultImplementation from 'src/lib/process-builder/globals/default-implementation';
import { ITextLeaf } from 'src/lib/process-builder/interfaces/text-leaf.interface';
import { ProcessBuilderRepository } from '@/lib/core/process-builder-repository';

@Component({
  selector: 'app-task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.scss'],
})
export class TaskCreationComponent implements OnDestroy, OnInit {
  @ViewChild('dynamicInner', { static: true, read: ViewContainerRef })
  private dynamicInner!: ViewContainerRef;

  public formGroup = new FormGroup({
    canFail: new FormControl<boolean>(this.data.taskCreationFormGroupValue.canFail),
    entranceGatewayType: new FormControl<GatewayType | null>(this.data.taskCreationFormGroupValue.entranceGatewayType),
    functionIdentifier: new FormControl<number | null>(this.data.taskCreationFormGroupValue.functionIdentifier),
    implementation: new FormControl<ITextLeaf | null>(this.data.taskCreationFormGroupValue.implementation),
    inputParam: new FormControl<ParamCodes[] | number | null>(this.data.taskCreationFormGroupValue.inputParam),
    interface: new FormControl<string | null>(this.data.taskCreationFormGroupValue.interface),
    isProcessOutput: new FormControl<boolean>(this.data.taskCreationFormGroupValue.isProcessOutput),
    name: new FormControl<string>(this.data.taskCreationFormGroupValue.name),
    normalizedOutputParamName: new FormControl<string>(this.data.taskCreationFormGroupValue.normalizedOutputParamName),
    normalizedName: new FormControl<string>(this.data.taskCreationFormGroupValue.normalizedName),
    outputParamName: new FormControl<string>(this.data.taskCreationFormGroupValue.outputParamName),
    outputParamValue: new FormControl<IParam | IParamDefinition[] | null>(this.data.taskCreationFormGroupValue.outputParamValue),
    outputTemplateName: new FormControl<string>(this.data.taskCreationFormGroupValue.outputTemplateName),
    requireCustomImplementation: new FormControl<boolean>(this.data.taskCreationFormGroupValue.requireCustomImplementation),
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

  public currentStepIndex = signal(0);

  private _formValue$ = this.formGroup.valueChanges.pipe(startWith(this.formGroup.value));

  public hasCustomImplementation$ = this._formValue$
    .pipe(
      map((formValue) => {
        const hasCustomImplementation = formValue.requireCustomImplementation || formValue.implementation ? true : false;
        return hasCustomImplementation;
      }),
      distinctUntilChanged()
    );

  public selectedFunction$ = this.formGroup.controls.functionIdentifier.valueChanges
    .pipe(
      startWith(this.formGroup.controls.functionIdentifier.value),
      switchMap(functionIdentifier => this._store.select(selectIFunction(functionIdentifier))),
    );

  public hasDynamicInputParameters$ = this.selectedFunction$
    .pipe(
      map(selectedFunction => selectedFunction?.inputTemplates === 'dynamic' && !(selectedFunction.requireCustomImplementation || selectedFunction.customImplementation) ? true : false),
      distinctUntilChanged()
    );

  public hasDynamicOutputParameters$ = this.selectedFunction$.pipe(
    map((selectedFunction) =>
      selectedFunction?.outputTemplate === 'dynamic' ? true : false
    ),
    distinctUntilChanged()
  );

  public hasDataMapping$ = this.selectedFunction$.pipe(
    map((selectedFunction) => selectedFunction?.requireDataMapping ?? false),
    distinctUntilChanged()
  );

  public hasStaticOutputDefinition$ = this.selectedFunction$.pipe(
    map((selectedFunction) => {
      const outp = selectedFunction?.requireStaticOutputDefinition ?? false;
      return outp;
    }),
    distinctUntilChanged()
  );

  public steps$ = combineLatest([this.hasCustomImplementation$, this.hasDynamicInputParameters$, this.hasDataMapping$, this.unableToDetermineOutputParam$, this.hasStaticOutputDefinition$]).pipe(
    map(
      ([hasCustomImplementation, hasDynamicInputParameters, hasDataMapping, unableToDetermineOutputParam, hasStaticOutputDefinition]) =>
        this.getSteps([
          hasDynamicInputParameters,
          hasCustomImplementation,
          hasDataMapping,
          unableToDetermineOutputParam,
          hasStaticOutputDefinition,
        ])
    )
  );

  public currentStep$ = combineLatest([this.steps$, toObservable(this.currentStepIndex)]).pipe(
    map(([steps, index]) => steps[index]),
    filter((step) => (step ? true : false)),
    distinctUntilChanged(
      (prev, curr) => prev.taskCreationStep === curr.taskCreationStep
    )
  );

  public hasPreviousStep$ = toObservable(this.currentStepIndex).pipe(map((index) => index > 0));
  public hasNextStep$ = combineLatest([this.steps$, toObservable(this.currentStepIndex)]).pipe(map(([steps, index]) => index < steps.length - 1));
  public canAnalyzeCustomImplementation$ = this.currentStep$.pipe(
    filter((x) => (x ? true : false)),
    map((x) => x.taskCreationStep === TaskCreationStep.ConfigureFunctionImplementation || x.taskCreationStep === TaskCreationStep.ConfigureFunctionOutput)
  );

  public stepToNextStep$: Observable<number> = this.currentStep$.pipe(switchMap(step => step?.autoProceed$ ?? NEVER)) as Observable<number>;

  public formInvalid$ = this.formGroup.statusChanges.pipe(map((status) => status === 'INVALID'), startWith(this.formGroup.status));

  private _subscription = new Subscription();

  constructor(
    @Inject(PROCESS_BUILDER_CONFIG_TOKEN) public config: IProcessBuilderConfig,
    @Inject(MAT_DIALOG_DATA) public data: ITaskCreationDataWrapper,
    private _ref: MatDialogRef<TaskCreationComponent>,
    private _store: Store
  ) { }

  public abort = () => this._ref.close();
  public finish = () => this._ref.close(this.formGroup.value);
  public nextStep = () => this.setStep(this.currentStepIndex() + 1);
  public previousStep = () => this.setStep(this.currentStepIndex() - 1);

  public ngOnDestroy = () => this._subscription.unsubscribe();

  public ngOnInit(): void {
    this.validateFunctionSelection();
    this.setStep(0);

    this._autoNormalizeNames();

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
        this.currentStep$.subscribe((step) => this.renderStep(step)),
        this.stepToNextStep$.subscribe((stepIndex: number) =>
          this.setStep(stepIndex + 1)
        ),
      ]
    );
  }

  public setStep = (index: number) => this.currentStepIndex.set(index);

  public async validateFunctionSelection() {
    const currentFunction = await selectSnapshot(this._store.select(selectIFunction(this.formGroup.controls.functionIdentifier?.value)));
    if (currentFunction) {
      const outputParam = await selectSnapshot(this._store.select(selectIParam(currentFunction?.output))),
        outputParamInterface = await selectSnapshot(this._store.select(selectIInterface(currentFunction?.outputTemplate as string)));

      const inputParams = currentFunction?.inputTemplates === 'dynamic' && currentFunction.inputTemplates ? Array.isArray(currentFunction.inputTemplates) ? [...currentFunction.inputTemplates] : [currentFunction.inputTemplates] : [];
      const outputParamValue = currentFunction?.outputTemplate === 'dynamic' && outputParamInterface ? outputParamInterface.typeDef : outputParam?.type === 'object' ? outputParam?.typeDef : outputParam;

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

      const textLeaf = currentFunction.requireCustomImplementation || Array.isArray(currentFunction.customImplementation) ? CodemirrorRepository.stringToTextLeaf(currentFunction.customImplementation ?? defaultImplementation) : undefined;
      this.formGroup.patchValue({
        canFail: currentFunction.canFail,
        implementation: textLeaf,
        requireCustomImplementation: currentFunction.requireCustomImplementation,
        name: currentFunction.name,
        normalizedName: currentFunction.normalizedName,
        normalizedOutputParamName: outputParam?.normalizedName,
        interface: outputParam?.type === 'array' ? (outputParam.typeDef as IParamDefinition[])[0].interface : outputParam?.interface,
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
      throw `no config found for step ${step.taskCreationStep}`;
    }

    const component = this.dynamicInner.createComponent(stepConfiguration.type);
    if (typeof stepConfiguration.provideInputParams === 'function') {
      stepConfiguration.provideInputParams(component.instance, step.element);
    }
  }

  private getSteps([hasDynamicInputParam, hasCustomImplementation, hasDataMapping, unableToDetermineOutputParam, hasStaticOutputDefinition]: boolean[]) {
    const availableSteps: ITaskCreationConfig[] = [];
    if (this.data) {
      const gateway = this.data?.taskCreationPayload?.configureIncomingErrorGatewaySequenceFlow;
      if (gateway) {
        availableSteps.push({
          taskCreationStep: TaskCreationStep.ConfigureErrorGatewayEntranceConnection,
          element: gateway,
          autoProceed$: this.formGroup.controls.entranceGatewayType?.valueChanges.pipe(
            switchMap(() => this.steps$),
            filter((steps) => steps.length > 1),
            map((steps) => {
              const index = steps.findIndex(
                (step) =>
                  step.taskCreationStep ===
                  TaskCreationStep.ConfigureErrorGatewayEntranceConnection
              );
              return index;
            })
          ),
        } as ITaskCreationConfig);
      }

      const activity = this.data?.taskCreationPayload?.configureActivity;
      if (activity) {
        availableSteps.push({
          taskCreationStep: TaskCreationStep.ConfigureFunctionSelection,
          element: activity,
        });

        if (hasDynamicInputParam) {
          availableSteps.push({
            taskCreationStep: TaskCreationStep.ConfigureFunctionInput,
            element: activity,
          });
        }

        if (hasCustomImplementation) {
          availableSteps.push({
            taskCreationStep: TaskCreationStep.ConfigureFunctionImplementation,
            element: activity,
          });
        }

        if (hasDataMapping) {
          availableSteps.push({
            taskCreationStep: TaskCreationStep.ConfigureInputOutputMapping,
            element: activity,
          });
        }

        if (unableToDetermineOutputParam) {
          availableSteps.push({
            taskCreationStep: TaskCreationStep.ConfigureFunctionOutput,
            element: activity
          });
        }

        if (hasStaticOutputDefinition) {
          const step = {
            taskCreationStep: TaskCreationStep.ConfigureStaticOutput,
            element: activity,
          }
          availableSteps.push(step);
        }
      }
    }
    return availableSteps;
  }

  public TaskCreationStep = TaskCreationStep;

  private _autoNormalizeNames() {
    this._subscription.add(...[
      this.formGroup.controls.name!
        .valueChanges
        .pipe(debounceTime(200), map((name) => ProcessBuilderRepository.normalizeName(name)))
        .subscribe((normalizedName) => this.formGroup.controls.normalizedName?.setValue(normalizedName)),

      this.formGroup.controls.outputParamName!
        .valueChanges
        .pipe(debounceTime(200), map((name) => ProcessBuilderRepository.normalizeName(name)))
        .subscribe((normalizedName) => this.formGroup.controls.normalizedOutputParamName?.setValue(normalizedName)),
    ]);
  }
}
