import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, Input, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subscription } from 'rxjs';
import { ProcessBuilderRepository } from 'src/lib/core/process-builder-repository';
import { IEmbeddedView } from 'src/lib/process-builder/globals/i-embedded-view';
import { syntaxTree } from "@codemirror/language";
import { autocompletion, CompletionContext } from "@codemirror/autocomplete";
import { EditorState, Text } from '@codemirror/state';
import { basicSetup, EditorView } from '@codemirror/basic-setup';
import { esLint, javascript } from '@codemirror/lang-javascript';
import { CodemirrorRepository } from 'src/lib/core/codemirror-repository';
import { MethodEvaluationStatus } from 'src/lib/process-builder/globals/method-evaluation-status';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/globals/i-process-builder-config';
import { linter, lintGutter } from '@codemirror/lint';
// @ts-ignore
import Linter from "eslint4b-prebuilt";
import { INJECTOR_INTERFACE_TOKEN } from 'src/lib/process-builder/globals/injector';
import defaultImplementation from 'src/lib/process-builder/globals/default-implementation';
import { debounceTime, tap } from 'rxjs/operators';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-embedded-function-implementation',
  templateUrl: './embedded-function-implementation.component.html',
  styleUrls: ['./embedded-function-implementation.component.sass']
})
export class EmbeddedFunctionImplementationComponent implements IEmbeddedView, AfterViewInit, OnDestroy {

  @Input() inputParams!: number | number[] | null;

  @ViewChild('codeBody', { static: true, read: ElementRef }) codeBody!: ElementRef<HTMLDivElement>;
  codeMirror!: EditorView;

  globalsInjector: any = {
    'const': { type: 'variable' },
    'injector': { type: 'variable', apply: 'injector' },
    'main': { type: 'function', apply: 'async () => {\n  // your code\n}\n', hint: 'async' },
    'let': { type: 'variable' },
    'parseInt()': { type: 'function' },
    'var': { type: 'variable' },
  };

  varNameInjector: any = {
    'var1': { type: 'variable' },
    'var2': { type: 'variable' }
  };

  formGroup!: UntypedFormGroup;

  private _implementationChanged = new ReplaySubject<Text>(1);
  implementationChanged$ = this._implementationChanged.asObservable();

  private _returnValueStatus: BehaviorSubject<MethodEvaluationStatus> = new BehaviorSubject<MethodEvaluationStatus>(MethodEvaluationStatus.Initial);
  public returnValueStatus$ = this._returnValueStatus.asObservable();

  private _subscriptions = new Subscription();

  constructor(
    @Inject(PROCESS_BUILDER_CONFIG_TOKEN) public config: IProcessBuilderConfig,
    @Inject(INJECTOR_INTERFACE_TOKEN) private _injector: object,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  blockTabPressEvent(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  ngAfterViewInit(): void {
    this._subscriptions.add(...[
      this.implementationChanged$.pipe(debounceTime(500)).subscribe((value) => {
        this.formGroup.controls['implementation'].setValue((value as any)?.text);
      }),
      this.formGroup.controls['name'].valueChanges.pipe(debounceTime(200)).subscribe(name => this.formGroup.controls['normalizedName'].setValue(ProcessBuilderRepository.normalizeName(name))),
      this.formGroup.controls['outputParamName'].valueChanges.pipe(debounceTime(200)).subscribe(name => this.formGroup.controls['normalizedOutputParamName'].setValue(ProcessBuilderRepository.normalizeName(name))),
      this._implementationChanged.pipe(
        tap(() => this._returnValueStatus.next(MethodEvaluationStatus.Calculating)),
        debounceTime(500)
      ).subscribe(() => {
        const evaluationResult = CodemirrorRepository.evaluateCustomMethod(this.codeMirror.state);
        this._returnValueStatus.next(evaluationResult.status);
      }),
      this.returnValueStatus$.subscribe((status) => {
        if (status === MethodEvaluationStatus.ReturnValueFound) {
          this.formGroup.controls['outputParamName'].enable();

        } else {
          this.formGroup.controls['outputParamName'].disable();
        }
      }),
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
    let nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1);
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

  state = () => EditorState.create({
    doc: Array.isArray(this.formGroup.controls['implementation'].value) ? this.formGroup.controls['implementation'].value.join('\n') : defaultImplementation,
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

  MethodEvaluationStatus = MethodEvaluationStatus;

  get canFailControl(): UntypedFormControl {
    return this.formGroup.controls['canFail'] as UntypedFormControl;
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
