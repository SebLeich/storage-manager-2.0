import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, Input, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subscription } from 'rxjs';
import { ProcessBuilderRepository } from 'src/lib/core/process-builder-repository';
import { IEmbeddedView } from 'src/lib/process-builder/classes/embedded-view';
import { syntaxTree } from "@codemirror/language";
import { autocompletion, CompletionContext } from "@codemirror/autocomplete";
import { EditorState, Text } from '@codemirror/state';
import { basicSetup, EditorView } from '@codemirror/basic-setup';
import { javascript } from '@codemirror/lang-javascript';
import { CodemirrorRepository } from 'src/lib/core/codemirror.repository';
import { MethodEvaluationStatus } from 'src/lib/process-builder/globals/method-evaluation-status';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/process-builder-config.interface';
import { lintGutter } from '@codemirror/lint';
import defaultImplementation from 'src/lib/process-builder/globals/default-implementation';
import { debounceTime, map, shareReplay, tap } from 'rxjs/operators';
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
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { IInterface } from 'src/lib/process-builder/interfaces/interface.interface';
import { TaskCreationFormGroup } from 'src/lib/process-builder/interfaces/task-creation-form-group-value.interface';

@Component({
  selector: 'app-embedded-function-implementation',
  templateUrl: './embedded-function-implementation.component.html',
  styleUrls: ['./embedded-function-implementation.component.scss'],
  providers: [ ProcessBuilderService ]
})
export class EmbeddedFunctionImplementationComponent implements IEmbeddedView, AfterViewInit, OnDestroy {

  @Input() public inputParams!: number[];

  @ViewChild('codeBody', { static: true, read: ElementRef }) codeBody!: ElementRef<HTMLDivElement>;
  public codeMirror!: EditorView;

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
    this._handleImplementationChanges();

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

    this.codeMirror = new EditorView({
      state: this.state(),
      parent: this.codeBody.nativeElement
    });
    this._implementationChanged.next(this.codeMirror.state.doc);

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

  public state = () => {
    const implementation = this.formGroup.controls.implementation!.value;
    return EditorState.create({
      doc: Array.isArray(implementation) ? implementation.join('\n') : defaultImplementation,
      extensions: [
        basicSetup,
        autocompletion({ override: [this.complete] }),
        javascript(),
        EditorView.updateListener.of((evt) => {
          if (evt.docChanged) {
            this._implementationChanged.next(this.codeMirror.state.doc);
          }
        }),
        lintGutter(),
      ]
    });
  };

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

  private async _evaluateImplementation(implementation: string[] | null) {
    const evaluationResult = CodemirrorRepository.evaluateCustomMethod(this.codeMirror.state, implementation ?? undefined);
    this._returnValueStatus.next(evaluationResult.status);

    if (evaluationResult?.injectorNavigationPath) {
      const inputParams = await selectSnapshot(this.inputParams$);
      const result = await this._processBuilderService.mapNavigationPathPropertyMetadata(evaluationResult.injectorNavigationPath, inputParams);

      if ((result as any)?.interface) {
        let iFace: IInterface = (result as any).interface;
        this.formGroup.controls.interface!.setValue(iFace.identifier);

        if (this.formGroup.controls.outputParamName?.pristine) {
          this.formGroup.controls.outputParamName!.setValue(iFace.normalizedName);
        }

        if (this.formGroup.controls.name?.pristine) {
          this.formGroup.controls.name!.setValue(`provide ${iFace.normalizedName}`);
        }
      }
    }
  }

  private _handleImplementationChanges() {
    this._subscriptions.add(...[
      this.implementationChanged$
        .pipe(
          tap(() => this._returnValueStatus.next(MethodEvaluationStatus.Calculating)),
          debounceTime(500)
        )
        .subscribe((implementation) => {
          this.formGroup.controls.implementation!.setValue((implementation as any)?.text);
        }),

      this.formGroup.controls.implementation!
        .valueChanges
        .subscribe(async (implementation) => {
          await this._evaluateImplementation(implementation);
        })
    ]);
  }

}
