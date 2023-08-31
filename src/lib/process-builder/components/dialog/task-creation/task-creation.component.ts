import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, ViewChild, ViewContainerRef, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { combineLatest, concat, NEVER, Observable, Subscription } from 'rxjs';
import { ITaskCreationConfig } from 'src/lib/process-builder/interfaces/task-creation-config.interface';
import { TaskCreationStep } from 'src/lib/process-builder/globals/task-creation-step';
import { selectFunction } from '@process-builder/selectors';
import { CodemirrorRepository } from 'src/lib/core/codemirror.repository';
import { MethodEvaluationStatus } from 'src/lib/process-builder/globals/method-evaluation-status';
import { FormControl, FormGroup } from '@angular/forms';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/process-builder-config.interface';
import { debounceTime, distinctUntilChanged, filter, map, share, startWith, switchMap, take } from 'rxjs/operators';
import STEP_REGISTRY from './constants/step-registry.constant';
import { functionSelectedValidator } from './validators/function-exists-when-required.validator';
import { implementationExistsWhenRequiredValidator } from './validators/implementation-exists-when-required.validator';
import { showAnimation } from '@/lib/shared/animations/show';
import { BPMNJsRepository } from '@/lib/core/bpmn-js.repository';
import { ParameterService } from '@/lib/process-builder/services/parameter.service';
import { outputNameValidator } from './validators/output-name.validator';
import { ITaskCreationInput } from './interfaces/task-creation-input.interface';
import { selectSnapshot } from '@/lib/process-builder/globals/select-snapshot';
import { ITextLeaf } from '@/lib/process-builder/interfaces/text-leaf.interface';
import { IEvaluationResultProvider } from './interfaces/evalution-result-provider.interface';
import { IMethodEvaluationResult } from '@/lib/process-builder/interfaces';

@Component({
	selector: 'app-task-creation',
	templateUrl: './task-creation.component.html',
	styleUrls: ['./task-creation.component.scss'],
	providers: [ParameterService],
	animations: [showAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCreationComponent implements IEvaluationResultProvider, OnDestroy, OnInit {
	@ViewChild('dynamicInner', { static: true, read: ViewContainerRef })
	private dynamicInner!: ViewContainerRef;

	public formGroup = new FormGroup({
		entranceGatewayType: new FormControl(this.data.taskCreationFormGroupValue.entranceGatewayType),
		functionCanFail: new FormControl(this.data.taskCreationFormGroupValue.functionCanFail),
		functionIdentifier: new FormControl(this.data.taskCreationFormGroupValue.functionIdentifier),
		functionImplementation: new FormControl(this.data.taskCreationFormGroupValue.functionImplementation),
		functionName: new FormControl(this.data.taskCreationFormGroupValue.functionName),
		functionNormalizedName: new FormControl(this.data.taskCreationFormGroupValue.functionNormalizedName),
		outputParamInterface: new FormControl(this.data.taskCreationFormGroupValue.outputParamInterface),
		outputParamName: new FormControl(this.data.taskCreationFormGroupValue.outputParamName),
		outputParamNormalizedName: new FormControl(this.data.taskCreationFormGroupValue.outputParamNormalizedName),
		outputParamType: new FormControl(this.data.taskCreationFormGroupValue.outputParamType),
		outputParamValue: new FormControl(this.data.taskCreationFormGroupValue.outputParamValue),
	}, {
		asyncValidators: [outputNameValidator(this._store, this), implementationExistsWhenRequiredValidator(this._store)],
		validators: [functionSelectedValidator(this.data?.taskCreationPayload?.configureActivity ? true : false)]
	});

	public customEvaluationResult$ = concat(
		this.formGroup.controls.functionImplementation.valueChanges.pipe(take(1)),
		this.formGroup.controls.functionImplementation.valueChanges.pipe(debounceTime(1000)),
	).pipe(
		switchMap(async (implementation) => await this.getEvaluationResult(implementation)),
		share()
	) as Observable<IMethodEvaluationResult>;

	public unableToDetermineOutputParam$ = this.customEvaluationResult$.pipe(
		map(evaluationResult => {
			if (evaluationResult && evaluationResult.status === MethodEvaluationStatus.ReturnValueFound && !evaluationResult.type) {
				return true;
			}
			return false;
		}),
		startWith(false)
	);

	public currentStepIndex = signal(0);

	public selectedFunction$ = this.formGroup.controls.functionIdentifier.valueChanges
		.pipe(
			startWith(this.formGroup.controls.functionIdentifier.value),
			switchMap(functionIdentifier => this._store.select(selectFunction(functionIdentifier))),
		);

	public hasCustomImplementation$ = this.selectedFunction$
		.pipe(map((selectedFunction) => selectedFunction?.requireCustomImplementation ?? false), distinctUntilChanged());

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
	public steps$ = combineLatest([this.hasCustomImplementation$, this.hasDynamicInputParameters$, this.hasDataMapping$, this.hasStaticOutputDefinition$]).pipe(
		map(
			([hasCustomImplementation, hasDynamicInputParameters, hasDataMapping, hasStaticOutputDefinition]) =>
				this._getSteps([
					hasDynamicInputParameters,
					hasCustomImplementation,
					hasDataMapping,
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
	public formInvalid$ = this.formGroup.statusChanges.pipe(startWith(this.formGroup.status), map((status) => status === 'INVALID'));

	public isBlocked = false;

	private _subscription = new Subscription();

	constructor(
		@Inject(PROCESS_BUILDER_CONFIG_TOKEN) public config: IProcessBuilderConfig,
		@Inject(MAT_DIALOG_DATA) public data: ITaskCreationInput,
		private _parameterService: ParameterService,
		private _ref: MatDialogRef<TaskCreationComponent>,
		private _store: Store
	) { }

	public abort = () => this._ref.close({ taskCreationPayload: this.data.taskCreationPayload });
	public finish = () => this._onClose();
	public nextStep = () => this.setStep(this.currentStepIndex() + 1);
	public previousStep = () => this.setStep(this.currentStepIndex() - 1);

	public ngOnDestroy = () => this._subscription.unsubscribe();

	public ngOnInit(): void {
		this.setStep(0);

		this._subscription.add(this.currentStep$.subscribe((step) => this._renderStep(step)));
		this._subscription.add(this.stepToNextStep$.subscribe((stepIndex: number) => this.setStep(stepIndex + 1)));
	}

	public setStep = (index: number) => this.currentStepIndex.set(index);

	public TaskCreationStep = TaskCreationStep;

	public async getEvaluationResult(implementation: ITextLeaf | null = this.formGroup.controls.functionImplementation?.value ?? null) {
		const inputParams = BPMNJsRepository.getAvailableInputParams(this.data.taskCreationPayload.configureActivity);
		const { injector, mappedParameters } = await this._parameterService.parameterToInjector(inputParams);

		return CodemirrorRepository.evaluateCustomMethod(undefined, implementation?.text ?? [], injector, mappedParameters);
	}

	private async _onClose() {
		this.isBlocked = true;
		this._ref.disableClose = true;

		const inputParams = BPMNJsRepository.getAvailableInputParams(this.data.taskCreationPayload.configureActivity);
		const { injector, mappedParameters } = await this._parameterService.parameterToInjector(inputParams),
			taskCreationPayload = this.data.taskCreationPayload,
			selectedFunction = await selectSnapshot(this._store.select(selectFunction(this.formGroup.value.functionIdentifier)));

		const implementation = selectedFunction?.requireCustomImplementation? this.formGroup.value.functionImplementation?.text ?? []: selectedFunction?.implementation;
		const methodEvaluation = CodemirrorRepository.evaluateCustomMethod(undefined, implementation, injector, mappedParameters)

		this.isBlocked = false;
		this._ref.disableClose = false;

		this._ref.close({ formValue: this._formValue, initialFormValue: this.data.taskCreationFormGroupValue, selectedFunction, taskCreationPayload, methodEvaluation });
	}

	private get _formValue() {
		return this.formGroup.getRawValue();
	}

	private _renderStep(step: ITaskCreationConfig) {
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

	private _getSteps([hasDynamicInputParam, hasCustomImplementation, hasDataMapping, hasStaticOutputDefinition]: boolean[]) {
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
}
