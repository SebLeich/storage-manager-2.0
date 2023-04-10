import { AfterViewInit, ChangeDetectorRef, Component, Inject, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subscription } from 'rxjs';
import { ProcessBuilderRepository } from 'src/lib/core/process-builder-repository';
import { IEmbeddedView } from 'src/lib/process-builder/classes/embedded-view';
import { syntaxTree } from "@codemirror/language";
import { CompletionContext } from "@codemirror/autocomplete";
import { Text } from '@codemirror/state';
import { MethodEvaluationStatus } from 'src/lib/process-builder/globals/method-evaluation-status';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/process-builder-config.interface';
import { debounceTime, map, shareReplay } from 'rxjs/operators';
import { ControlContainer, FormControl, UntypedFormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectIParams } from 'src/lib/process-builder/store/selectors/param.selectors';
import { mapIParamsInterfaces } from 'src/lib/process-builder/extensions/rxjs/map-i-params-interfaces.rxjs';
import completePropertyAfter from './constants/complete-property-after.contant';
import doNotCompleteAfter from './constants/do-not-complete-after.constant';
import completeProperties from './methods/complete-properties.method';
import byStringMethods from './methods/by-string.methods';
import { ProcessBuilderService } from 'src/lib/process-builder/services/process-builder.service';
import globalsInjector from './constants/globals-injector.constant';
import { TaskCreationFormGroup } from 'src/lib/process-builder/interfaces/task-creation-form-group-value.interface';

@Component({
  selector: 'app-embedded-function-implementation',
  templateUrl: './embedded-function-implementation.component.html',
  styleUrls: ['./embedded-function-implementation.component.scss'],
  providers: [ ProcessBuilderService ]
})
export class EmbeddedFunctionImplementationComponent implements IEmbeddedView, AfterViewInit, OnDestroy {

  @Input() public inputParams!: number[];

  public inputParams$ = this._store.select(selectIParams(this.inputParams)).pipe(shareReplay());

  public varNameInjector: any = {
    'var1': { type: 'variable' },
    'var2': { type: 'variable' }
  };

  private _implementationChanged = new ReplaySubject<Text>(1);
  public implementationChanged$ = this._implementationChanged.asObservable();

  private _returnValueStatus: BehaviorSubject<MethodEvaluationStatus> = new BehaviorSubject<MethodEvaluationStatus>(MethodEvaluationStatus.Initial);
  public returnValueStatus$ = this._returnValueStatus.asObservable();

  private _injector: any = { injector: {} };
  private _subscriptions = new Subscription();

  constructor(
    @Inject(PROCESS_BUILDER_CONFIG_TOKEN) public config: IProcessBuilderConfig,
    private _processBuilderService: ProcessBuilderService,
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
      }),
      this.inputParams$.pipe(mapIParamsInterfaces(this._store))
        .subscribe((inputParams) => {
          let injectorObject = {
            injector: {} as { [key: string]: any },
            'httpClient.get': {
              type: 'function',
              apply: 'await httpClient.get(/** url **/).toPromise()'
            },
            'httpClient.post': {
              type: 'function',
              apply: 'await httpClient.post(/** url **/, /** json body **/).toPromise()'
            }
          };
          inputParams.forEach(param => {
            if (param.defaultValue) {
              injectorObject.injector[param.normalizedName] = param.defaultValue;
            } else {
              const dummyValue = ProcessBuilderRepository.createPseudoObjectFromIParam(param);
              injectorObject.injector[param.normalizedName] = dummyValue;
            }
          });
          this._injector = injectorObject;
        })
    ]);

    this._changeDetectorRef.detectChanges();
  }

  public ngOnDestroy = () => this._subscriptions.unsubscribe();

  public complete = (context: CompletionContext) => {
    const nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1);
    if (completePropertyAfter.includes(nodeBefore.name) && nodeBefore.parent?.name === "MemberExpression") {
      let object = nodeBefore.parent.getChild("Expression");
      if (object?.name === 'VariableName' || object?.name === 'MemberExpression') {
        const variableName = context.state.sliceDoc(object.from, object.to), injectedValue = byStringMethods(this._injector, variableName);
        if (typeof injectedValue === "object") {
          const from = /\./.test(nodeBefore.name) ? nodeBefore.to : nodeBefore.from;
          return completeProperties(from, injectedValue as any);
        }
      }
    } else if (nodeBefore.name == "VariableName") {
      return completeProperties(nodeBefore.from, globalsInjector as any);
    } else if (/*context.explicit && */!doNotCompleteAfter.includes(nodeBefore.name)) {
      return completeProperties(context.pos, this._injector as any);
    }
    return null
  }

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
