import { AfterViewInit, ChangeDetectorRef, Component, Inject, Input, OnDestroy } from '@angular/core';
import { defer, NEVER, startWith, Subscription } from 'rxjs';
import { ProcessBuilderRepository } from 'src/lib/core/process-builder-repository';
import { IEmbeddedView } from 'src/lib/process-builder/classes/embedded-view';
import { MethodEvaluationStatus } from 'src/lib/process-builder/globals/method-evaluation-status';
import { debounceTime, map, shareReplay, tap } from 'rxjs/operators';
import { ControlContainer, FormControl, UntypedFormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectIParams } from '@process-builder/selectors';
import { mapIParamsInterfaces } from 'src/lib/process-builder/extensions/rxjs/map-i-params-interfaces.rxjs';
import { ProcessBuilderService } from 'src/lib/process-builder/services/process-builder.service';
import { TaskCreationFormGroup } from 'src/lib/process-builder/interfaces/task-creation-form-group-value.interface';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/process-builder-config.interface';
import { CodemirrorRepository } from 'src/lib/core/codemirror.repository';

@Component({
  selector: 'app-embedded-function-implementation',
  templateUrl: './embedded-function-implementation.component.html',
  styleUrls: ['./embedded-function-implementation.component.scss'],
  providers: [ProcessBuilderService]
})
export class EmbeddedFunctionImplementationComponent implements IEmbeddedView, AfterViewInit, OnDestroy {

  @Input() public inputParams!: number[];

  public inputParams$ = this._store.select(selectIParams(this.inputParams)).pipe(
    shareReplay(1),
    map(inputParams => inputParams ?? []),
    mapIParamsInterfaces(this._store),
    tap(() => {
      debugger;
    }),
    map(inputs => {
      return inputs.reduce((prev, curr) => {
        if (curr.defaultValue) {
          prev[curr.normalizedName] = curr.defaultValue;
        } else {
          const dummyValue = ProcessBuilderRepository.createPseudoObjectFromIParam(curr);
          prev[curr.normalizedName] = dummyValue;
        }

        return prev;
      }, {} as { [key: string]: object | string | number })
    })
  );

  public implementationChanged$ = defer(() => this.formGroup.controls.implementation?.valueChanges ?? NEVER);
  
  public returnValueStatus$ = defer(
    () => this.implementationChanged$.pipe(
      map((implementation) => {
        const code = implementation?.text;
        return CodemirrorRepository.evaluateCustomMethod(undefined, code)?.status;
      }),
      startWith(CodemirrorRepository.evaluateCustomMethod(undefined, this.formGroup.controls.implementation!.value?.text)?.status)
    )
  );

  private _subscriptions = new Subscription();

  constructor(
    @Inject(PROCESS_BUILDER_CONFIG_TOKEN) public config: IProcessBuilderConfig,
    private _store: Store,
    private _changeDetectorRef: ChangeDetectorRef,
    private _controlContainer: ControlContainer
  ) { }

  public blockTabPressEvent(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  public ngAfterViewInit(): void {
    this._autoNormalizeNames();

    this._subscriptions.add(...[
      this.returnValueStatus$.subscribe((status) => {
        this.formGroup.controls.outputParamName![status === MethodEvaluationStatus.ReturnValueFound ? 'enable' : 'disable']();
      })
    ]);

    this._changeDetectorRef.detectChanges();
  }

  public ngOnDestroy = () => this._subscriptions.unsubscribe();

  public MethodEvaluationStatus = MethodEvaluationStatus;

  public get formGroup() {
    return this._controlContainer.control as TaskCreationFormGroup;
  }

  public get canFailControl(): UntypedFormControl {
    return this.formGroup.controls['canFail'] as FormControl<boolean>;
  }

  public get normalizedNameControl() {
    return this.formGroup.controls['normalizedName'] as FormControl<string>;
  }

  private _autoNormalizeNames() {
    this._subscriptions.add(...[
      this.formGroup.controls.name!
        .valueChanges
        .pipe(debounceTime(200), map((name) => ProcessBuilderRepository.normalizeName(name)))
        .subscribe((normalizedName) => this.normalizedNameControl.setValue(normalizedName)),

      this.formGroup.controls.outputParamName!
        .valueChanges
        .pipe(debounceTime(200), map((name) => ProcessBuilderRepository.normalizeName(name)))
        .subscribe((normalizedName) => this.formGroup.controls.normalizedName!.setValue(normalizedName)),
    ]);
  }

}
