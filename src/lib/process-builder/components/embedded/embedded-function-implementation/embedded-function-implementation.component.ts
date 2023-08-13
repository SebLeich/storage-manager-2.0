import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, Input, OnDestroy } from '@angular/core';
import { defer, from, NEVER, startWith, Subscription } from 'rxjs';
import { IEmbeddedView } from 'src/lib/process-builder/classes/embedded-view';
import { MethodEvaluationStatus } from 'src/lib/process-builder/globals/method-evaluation-status';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { ControlContainer, FormControl, UntypedFormControl } from '@angular/forms';
import { ProcessBuilderService } from 'src/lib/process-builder/services/process-builder.service';
import { TaskCreationFormGroup } from 'src/lib/process-builder/interfaces/task-creation-form-group-value.interface';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/process-builder-config.interface';
import { CodemirrorRepository } from 'src/lib/core/codemirror.repository';
import { ParameterService } from '@/lib/process-builder/services/parameter.service';
import { Store } from '@ngrx/store';
import { selectIInterface, selectIInterfaces, selectIParam } from '@/lib/process-builder/store/selectors';
import { selectSnapshot } from '@/lib/process-builder/globals/select-snapshot';
import { MethodEvaluationResultType } from '@/lib/process-builder/types/method-evaluation-result.type';

@Component({
  selector: 'app-embedded-function-implementation',
  templateUrl: './embedded-function-implementation.component.html',
  styleUrls: ['./embedded-function-implementation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProcessBuilderService, ParameterService]
})
export class EmbeddedFunctionImplementationComponent implements IEmbeddedView, AfterViewInit, OnDestroy {

  @Input() public inputParams!: number[];

  public injectorDef$ = defer(() => from(this._parameterService.parameterToInjector(this.inputParams)));
  public injector$ = this.injectorDef$.pipe(map((def) => def.injector));
  public implementationChanged$ = defer(() => this.formGroup.controls.implementation?.valueChanges ?? NEVER);
  public methodEvaluationStatus$ = defer(
    () => this.implementationChanged$.pipe(
      startWith(this.formGroup.controls.implementation?.value),
      debounceTime(500),
      switchMap(async (implementation) => {
        const injector = await this._parameterService.parameterToInjector(this.inputParams),
          code = implementation?.text;

        return CodemirrorRepository.evaluateCustomMethod(undefined, code, injector.injector, injector.mappedParameters);
      }))
  );
  public returnValueStatus$ = defer(() => this.methodEvaluationStatus$.pipe(map((status) => status?.status), startWith(MethodEvaluationStatus.Initial)));
  public templates$ = this._store.select(selectIInterfaces());

  private _subscriptions = new Subscription();

  constructor(
    @Inject(PROCESS_BUILDER_CONFIG_TOKEN) public config: IProcessBuilderConfig,
    private _parameterService: ParameterService,
    private _controlContainer: ControlContainer,
    private _store: Store,
  ) { }

  public ngAfterViewInit(): void {
    this._subscriptions.add(this.returnValueStatus$.subscribe((status) => this._validateOutputParamNameControl(status)));
    this._subscriptions.add(this.methodEvaluationStatus$.subscribe(async (status) => await this._setTypeAndTemplate(status.type ?? 'undefined', status.interface, status.paramName ?? '')));

    this.formGroup.controls.interface?.disable();
  }

  public ngOnDestroy = () => this._subscriptions.unsubscribe();

  public MethodEvaluationStatus = MethodEvaluationStatus;

  public get formGroup(): TaskCreationFormGroup {
    return this._controlContainer.control as TaskCreationFormGroup;
  }

  public get canFailControl(): UntypedFormControl {
    return this.formGroup.controls['canFail'] as FormControl<boolean>;
  }

  private async _setTypeAndTemplate(type: MethodEvaluationResultType, templateIdentifier: string | null | undefined, paramName: string): Promise<void> {
    let outputParamName: string;
    this.formGroup.controls.outputParamType!.setValue(type);

    if (type !== 'object') {
      this.formGroup.controls.interface?.setValue(null);
      this.formGroup.controls.interface?.disable();
      outputParamName = paramName;
    }
    else {
      if (!templateIdentifier) {
        this.formGroup.controls.interface?.setValue(null);
        this.formGroup.controls.interface?.disable();
        return;
      }

      const template = await selectSnapshot(this._store.select(selectIInterface(templateIdentifier)));
      if (!template) {
        this.formGroup.controls.interface?.setValue(null);
        this.formGroup.controls.interface?.disable();
        return;
      }

      this.formGroup.controls.interface?.setValue(template.identifier);
      this.formGroup.controls.interface?.enable();
      outputParamName = template.name;
    }

    const persistedParam = await selectSnapshot(this._store.select(selectIParam(this.formGroup.controls.outputParamIdentifier?.value)));
    if(persistedParam){
      return;
    }

    if (this.formGroup.controls.outputParamName?.pristine) {
      this.formGroup.controls.outputParamName!.setValue(outputParamName);
    }

    if (this.formGroup.controls.name?.pristine) {
      this.formGroup.controls.name!.setValue(`provide ${outputParamName}`);
    }


  }

  private _validateOutputParamNameControl(status: MethodEvaluationStatus) {
    const control = this.formGroup.controls.outputParamName;
    if (!control) {
      return;
    }

    control[status === MethodEvaluationStatus.ReturnValueFound ? 'enable' : 'disable']();
  }

}
