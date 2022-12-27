import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, Input, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subscription } from 'rxjs';
import { ProcessBuilderRepository } from 'src/lib/core/process-builder-repository';
import { IEmbeddedView } from 'src/lib/process-builder/globals/i-embedded-view';
import { syntaxTree } from "@codemirror/language";
import { autocompletion, CompletionContext } from "@codemirror/autocomplete";
import { EditorState, Text } from '@codemirror/state';
import { basicSetup, EditorView } from '@codemirror/basic-setup';
import { esLint, javascript } from '@codemirror/lang-javascript';
import { CodemirrorRepository } from 'src/lib/core/codemirror.repository';
import { MethodEvaluationStatus } from 'src/lib/process-builder/globals/method-evaluation-status';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/globals/i-process-builder-config';
import { linter, lintGutter } from '@codemirror/lint';
// @ts-ignore
import Linter from "eslint4b-prebuilt";
import defaultImplementation from 'src/lib/process-builder/globals/default-implementation';
import { debounceTime, tap } from 'rxjs/operators';
import { FormControl, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { injectValues } from 'src/lib/process-builder/store/selectors/injection-context.selectors';
import { combineLatest } from 'rxjs';
import { selectIParams } from 'src/lib/process-builder/store/selectors/param.selectors';
import { mapIParamsInterfaces } from 'src/lib/process-builder/extensions/rxjs/map-i-params-interfaces.rxjs-extension';

@Component({
  selector: 'app-embedded-function-implementation',
  templateUrl: './embedded-function-implementation.component.html',
  styleUrls: ['./embedded-function-implementation.component.sass']
})
export class EmbeddedFunctionImplementationComponent implements IEmbeddedView, AfterViewInit, OnDestroy {

  @Input() public inputParams!: number[];

  @ViewChild('codeBody', { static: true, read: ElementRef }) codeBody!: ElementRef<HTMLDivElement>;
  public codeMirror!: EditorView;

  public globalsInjector: any = {
    'const': { type: 'variable' },
    'injector': { type: 'variable', apply: 'injector' },
    'main': { type: 'function', apply: 'async () => {\n  // your code\n}\n', hint: 'async' },
    'let': { type: 'variable' },
    'parseInt()': { type: 'function' },
    'var': { type: 'variable' },
  };

  public varNameInjector: any = {
    'var1': { type: 'variable' },
    'var2': { type: 'variable' }
  };

  public formGroup!: UntypedFormGroup;

  private _implementationChanged = new ReplaySubject<Text>(1);
  public implementationChanged$ = this._implementationChanged.asObservable();

  private _returnValueStatus: BehaviorSubject<MethodEvaluationStatus> = new BehaviorSubject<MethodEvaluationStatus>(MethodEvaluationStatus.Initial);
  public returnValueStatus$ = this._returnValueStatus.asObservable();

  private _injector: any = { injector: {}, injectorInterfaces: {} };
  private _subscriptions = new Subscription();

  constructor(
    @Inject(PROCESS_BUILDER_CONFIG_TOKEN) public config: IProcessBuilderConfig,
    private changeDetectorRef: ChangeDetectorRef,
    private _store: Store
  ) { }

  public blockTabPressEvent(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  public ngAfterViewInit(): void {
    this._subscriptions.add(...[
      this.formGroup.controls['name'].valueChanges.pipe(debounceTime(200)).subscribe(name => this.formGroup.controls['normalizedName'].setValue(ProcessBuilderRepository.normalizeName(name))),
      this.formGroup.controls['outputParamName'].valueChanges.pipe(debounceTime(200)).subscribe(name => this.formGroup.controls['normalizedOutputParamName'].setValue(ProcessBuilderRepository.normalizeName(name))),
      this.implementationChanged$.pipe(
        tap(() => this._returnValueStatus.next(MethodEvaluationStatus.Calculating)),
        debounceTime(500)
      ).subscribe((implementation) => {
        this.implementationControl.setValue((implementation as any)?.text);

        const evaluationResult = CodemirrorRepository.evaluateCustomMethod(this.codeMirror.state);
        this._returnValueStatus.next(evaluationResult.status);

        if (evaluationResult?.injectorNavigationPath) {
          const injectorDeepPathArray = evaluationResult.injectorNavigationPath.split('.');
          const injectorDeepPath = injectorDeepPathArray.slice(1).join('.');
          const interfaceDefinition = this._injector.injectorTypeDefMap[injectorDeepPath];
          /**
           * only getting root interfaces
           * -> we require embedded interfaces as well
           * -> method to convert navigation path to embedded interface
           */
          this.interfaceControl.setValue(interfaceDefinition?.interface);
        }
      }),
      this.returnValueStatus$.subscribe((status) => {
        if (status === MethodEvaluationStatus.ReturnValueFound) {
          this.formGroup.controls['outputParamName'].enable();
        } else {
          this.formGroup.controls['outputParamName'].disable();
        }
      }),
      combineLatest([this._store.select(injectValues()), this._store.select(selectIParams(this.inputParams)).pipe(
        mapIParamsInterfaces(this._store)
      )])
        .subscribe(([injector, inputParams]) => {
          let injectorObject = { injector: { ...injector }, injectorTypeDefMap: {} as { [key: string]: unknown } };
          inputParams.forEach(param => {
            if (param.defaultValue) {
              injectorObject.injector[param.normalizedName] = param.defaultValue;
            } else {
              const dummyValue = ProcessBuilderRepository.createPseudoObjectFromIParam(param);
              injectorObject.injector[param.normalizedName] = dummyValue;
            }
            injectorObject.injectorTypeDefMap[param.normalizedName] = { interface: param.interface };
          });
          this._injector = injectorObject;
        })
    ]);

    this.codeMirror = new EditorView({
      state: this.state(),
      parent: this.codeBody.nativeElement
    });
    this._implementationChanged.next(this.codeMirror.state.doc);
    this.changeDetectorRef.detectChanges();
  }

  public ngOnDestroy = () => this._subscriptions.unsubscribe();

  public complete = (context: CompletionContext) => {
    const nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1);
    if (completePropertyAfter.includes(nodeBefore.name) && nodeBefore.parent?.name === "MemberExpression") {
      let object = nodeBefore.parent.getChild("Expression");
      if (object?.name === 'VariableName' || object?.name === 'MemberExpression') {
        let from = /\./.test(nodeBefore.name) ? nodeBefore.to : nodeBefore.from;
        let variableName = context.state.sliceDoc(object.from, object.to);
        if (typeof byString(this._injector, variableName) === "object") {
          return completeProperties(from, byString(this._injector, variableName) as any);
        }
      }
    } else if (nodeBefore.name == "VariableName") {
      return completeProperties(nodeBefore.from, this.globalsInjector);
    } else if (/*context.explicit && */!dontCompleteIn.includes(nodeBefore.name)) {
      return completeProperties(context.pos, this._injector as any);
    }
    return null
  }

  public state = () => EditorState.create({
    doc: Array.isArray(this.implementationControl.value) ? this.implementationControl.value.join('\n') : defaultImplementation,
    extensions: [
      basicSetup,
      autocompletion({ override: [this.complete] }),
      javascript(),
      EditorView.updateListener.of((evt) => {
        if (evt.docChanged) {
          this._implementationChanged.next(this.codeMirror.state.doc);
        }
      }),
      linter(esLint(new Linter())),
      lintGutter()
    ]
  });

  public MethodEvaluationStatus = MethodEvaluationStatus;

  public get canFailControl(): UntypedFormControl {
    return this.formGroup.controls['canFail'] as UntypedFormControl;
  }

  public get implementationControl(): FormControl {
    return this.formGroup.controls['implementation'] as FormControl;
  }

  public get interfaceControl(): FormControl {
    return this.formGroup.controls['interface'] as FormControl;
  }

}

const completePropertyAfter = [
  ".",
  "?."
]

const dontCompleteIn = [
  "(",
  "{",
  ";",
  ",",
  "PropertyName",
  "TemplateString",
  "LineComment",
  "BlockComment",
  //"VariableDefinition",
  "PropertyDefinition"
]

function completeProperties(from: number, object: { type: string, apply?: string }) {
  let options = [];
  for (let name in object) {
    if (!(object as any)[name]) continue;
    let option = {
      label: name,
      type: (object as any)[name].type,
      apply: (object as any)[name].apply ?? name
    };
    options.push(option);
  }
  return {
    from,
    options,
    validFor: /^[\w$]*$/
  }
}

function byString(o: object, s: string) {
  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  s = s.replace(/^\./, '');           // strip a leading dot
  var a = s.split('.');
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (k in o) {
      o = (o as any)[k];
    } else {
      return;
    }
  }
  return o;
}
