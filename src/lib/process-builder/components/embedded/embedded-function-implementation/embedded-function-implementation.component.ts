import { AfterContentInit, ChangeDetectionStrategy, Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { concat, defer, from, Observable, of, startWith, Subscription } from 'rxjs';
import { IEmbeddedView } from 'src/lib/process-builder/classes/embedded-view';
import { MethodEvaluationStatus } from 'src/lib/process-builder/globals/method-evaluation-status';
import { debounceTime, map, share, switchMap, take } from 'rxjs/operators';
import { ControlContainer, FormControl } from '@angular/forms';
import { ProcessBuilderService } from 'src/lib/process-builder/services/process-builder.service';
import { TaskCreationFormGroup } from 'src/lib/process-builder/interfaces/task-creation-form-group-value.interface';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/process-builder-config.interface';
import { ParameterService } from '@/lib/process-builder/services/parameter.service';
import { Store } from '@ngrx/store';
import { selectFunction, selectIInterface, selectIInterfaces } from '@/lib/process-builder/store/selectors';
import { selectSnapshot } from '@/lib/process-builder/globals/select-snapshot';
import { ProcessBuilderRepository } from '@/lib/core/process-builder-repository';
import { ParamType } from '@/lib/process-builder/types/param.type';
import { FunctionOutputService } from '../../process-builder/services/function-output.service';
import { IFunction, IMethodEvaluationResult } from '@/lib/process-builder/interfaces';
import { CodemirrorRepository } from '@/lib/core/codemirror.repository';
import { ITextLeaf } from '@/lib/process-builder/interfaces/text-leaf.interface';

@Component({
	selector: 'app-embedded-function-implementation',
	templateUrl: './embedded-function-implementation.component.html',
	styleUrls: ['./embedded-function-implementation.component.scss'],
	providers: [ProcessBuilderService, ParameterService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmbeddedFunctionImplementationComponent implements IEmbeddedView, AfterContentInit, OnDestroy, OnInit {
	@Input() public inputParams!: number[];

	public injectorDef$ = defer(() => from(this._parameterService.parameterToInjector(this.inputParams)));
	public injector$ = this.injectorDef$.pipe(map((def) => def.injector));
	public customEvaluationResult$ = concat(
		of(this.formGroup.controls.functionImplementation?.value),
		(this.formGroup.controls.functionImplementation as FormControl).valueChanges.pipe(debounceTime(1000)),
	).pipe(
		switchMap(async (implementation) => await this._getEvaluationResult(implementation)),
		share()
	) as Observable<IMethodEvaluationResult>;

	public returnValueStatus$ = defer(() => this.customEvaluationResult$.pipe(map((status) => status?.status), startWith(MethodEvaluationStatus.Initial)));
	public templates$ = this._store.select(selectIInterfaces());

	private _functionOutputService = new FunctionOutputService(this._store);
	private _subscriptions = new Subscription();

	constructor(
		@Inject(PROCESS_BUILDER_CONFIG_TOKEN) public config: IProcessBuilderConfig,
		private _parameterService: ParameterService,
		private _controlContainer: ControlContainer,
		private _store: Store,
	) { }

	public ngOnInit(): void {
		this._subscriptions.add(this.returnValueStatus$.subscribe((status) => this._verifyOutputParamNameControl(status)));
		this._subscriptions.add(this.customEvaluationResult$.subscribe(async (status) => await this._verifyOutput(status.type ?? null, status.interface, status.paramName ?? '', status)));
		this._subscriptions.add(this.formGroup.controls.functionName?.valueChanges.subscribe((value) => this._normalizeFunctionName(value)));
		this._subscriptions.add(this.formGroup.controls.outputParamName?.valueChanges.subscribe((value) => this._normalizeOutputParamName(value)));
	}

	public ngAfterContentInit = () => this.formGroup.controls.outputParamInterface?.disable();
	public ngOnDestroy = () => this._subscriptions.unsubscribe();

	public MethodEvaluationStatus = MethodEvaluationStatus;

	public get formGroup(): TaskCreationFormGroup {
		return this._controlContainer.control as TaskCreationFormGroup;
	}

	public get functionCanFailControl(): FormControl<boolean> {
		return this.formGroup.controls.functionCanFail as FormControl<boolean>;
	}

	private async _verifyOutput(type: ParamType | null, templateIdentifier: string | null | undefined, paramName: string, status: IMethodEvaluationResult): Promise<void> {
		let outputParamName: string;
		(this.formGroup.controls.outputParamType as FormControl).setValue(type);

		if (type !== 'object') {
			this.formGroup.controls.outputParamInterface?.setValue(null);
			this.formGroup.controls.outputParamInterface?.disable();
			outputParamName = paramName;
		}
		else {
			if (!templateIdentifier) {
				this.formGroup.controls.outputParamInterface?.setValue(null);
				this.formGroup.controls.outputParamInterface?.enable();
				return;
			}

			const template = await selectSnapshot(this._store.select(selectIInterface(templateIdentifier)));
			if (!template) {
				this.formGroup.controls.outputParamInterface?.setValue(null);
				this.formGroup.controls.outputParamInterface?.disable();
				return;
			}

			this.formGroup.controls.outputParamInterface?.setValue(template.identifier);
			this.formGroup.controls.outputParamInterface?.enable();
			outputParamName = template.name;
		}

		const selectedFunction = await selectSnapshot(this._store.select(selectFunction(this.formGroup.controls.functionIdentifier?.value))) as IFunction;
		const { outputParamObject } = await this._functionOutputService.detectFunctionOutput(selectedFunction, status);
		if (outputParamObject) {
			return;
		}

		const normalizedOutputParamName = ProcessBuilderRepository.normalizeName(outputParamName);
		if (this.formGroup.controls.outputParamName?.pristine) {
			this.formGroup.controls.outputParamName.setValue(outputParamName);
			(this.formGroup.controls.outputParamNormalizedName as FormControl).setValue(normalizedOutputParamName);
		}

		if (this.formGroup.controls.functionName?.pristine) {
			const functionName = `provide ${outputParamName}`;
			const normalizedName = ProcessBuilderRepository.normalizeName(functionName);
			this.formGroup.controls.functionName.setValue(functionName);
			(this.formGroup.controls.functionNormalizedName as FormControl).setValue(normalizedName);
		}


	}

	private async _getEvaluationResult(implementation: ITextLeaf | null = this.formGroup.controls.functionImplementation?.value ?? null) {
		const { injector, mappedParameters } = await this._parameterService.parameterToInjector(this.inputParams);
		return CodemirrorRepository.evaluateCustomMethod(undefined, implementation?.text ?? [], injector, mappedParameters);
	}

	private _verifyOutputParamNameControl(status: MethodEvaluationStatus) {
		const control = this.formGroup.controls.outputParamName;
		if (!control) {
			return;
		}

		control[status === MethodEvaluationStatus.ReturnValueFound ? 'enable' : 'disable']();
	}

	private _normalizeFunctionName(functionName: string) {
		const normalizedName = ProcessBuilderRepository.normalizeName(functionName);
		this.formGroup.controls.functionNormalizedName?.setValue(normalizedName);
	}

	private _normalizeOutputParamName(outputParamName: string) {
		const normalizedName = ProcessBuilderRepository.normalizeName(outputParamName);
		this.formGroup.controls.outputParamNormalizedName?.setValue(normalizedName);
	}

}
