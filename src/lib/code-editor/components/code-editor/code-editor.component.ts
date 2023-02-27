import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { autocompletion, CompletionContext } from '@codemirror/autocomplete';
import { basicSetup, EditorView } from '@codemirror/basic-setup';
import { javascript } from '@codemirror/lang-javascript';
import { lintGutter } from '@codemirror/lint';
import { EditorState, Text } from '@codemirror/state';
import defaultImplementation from 'src/lib/process-builder/globals/default-implementation';
import { syntaxTree } from "@codemirror/language";
import completePropertyAfterContant from 'src/lib/process-builder/components/embedded/embedded-function-implementation/constants/complete-property-after.contant';
import completePropertiesMethod from 'src/lib/process-builder/components/embedded/embedded-function-implementation/methods/complete-properties.method';
import byStringMethods from 'src/lib/process-builder/components/embedded/embedded-function-implementation/methods/by-string.methods';
import globalsInjectorConstant from 'src/lib/process-builder/components/embedded/embedded-function-implementation/constants/globals-injector.constant';
import doNotCompleteAfterConstant from 'src/lib/process-builder/components/embedded/embedded-function-implementation/constants/do-not-complete-after.constant';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CodeEditorComponent),
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeEditorComponent implements ControlValueAccessor, OnInit {
  public implementation: Text = Text.of(defaultImplementation.split('\n'));
  private _onTouched?: (value: Text) => void;
  private _onChange?: (value: Text) => void;
  private _codeMirror!: EditorView;
  @ViewChild('codeBody', { static: true, read: ElementRef }) public codeBody!: ElementRef<HTMLDivElement>;
  @ViewChild('.cm-content', { static: false, read: ElementRef }) public codeMirrorContent!: ElementRef<HTMLDivElement>;

  constructor(private _renderer: Renderer2) { }

  public ngOnInit(): void {
    this._codeMirror = new EditorView({
      state: this._state,
      parent: this.codeBody.nativeElement
    });
  }

  public registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this._renderer.setAttribute(this.codeMirrorContent.nativeElement, 'contenteditable', (!isDisabled).toString());
  }

  public writeValue(text: Text | string | string[] | undefined | null): void {
    if (typeof text === 'object' && !Array.isArray(text)) {
      this.implementation = text as Text;
    } else {
      let lines: string[] = [];
      if (text) {
        lines = Array.isArray(text) ? text : text.split('\n');
      }
      this.implementation = Text.of(lines);
    }
  }

  private get _state() {
    return EditorState.create({
      doc: this.implementation,
      extensions: [
        basicSetup,
        autocompletion({ override: [this._complete] }),
        javascript(),
        EditorView.updateListener.of((evt) => {
          if (evt.docChanged) {
            this.implementation = evt.state.doc;
            if (typeof this._onChange === 'function') {
              this._onChange(this.implementation);
            }
          }
          if (evt.focusChanged) {
            if (typeof this._onTouched === 'function') {
              this._onTouched(this.implementation);
            }
          }
        }),
        lintGutter(),
      ]
    });
  }

  private _complete = (context: CompletionContext) => {
    const nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1);
    if (completePropertyAfterContant.includes(nodeBefore.name) && nodeBefore.parent?.name === "MemberExpression") {
      let object = nodeBefore.parent.getChild("Expression");
      if (object?.name === 'VariableName' || object?.name === 'MemberExpression') {
        const variableName = context.state.sliceDoc(object.from, object.to), injectedValue = byStringMethods({} as any, variableName);
        if (typeof injectedValue === "object") {
          const from = /\./.test(nodeBefore.name) ? nodeBefore.to : nodeBefore.from;
          return completePropertiesMethod(from, injectedValue as any);
        }
      }
    } else if (nodeBefore.name == "VariableName") {
      return completePropertiesMethod(nodeBefore.from, globalsInjectorConstant as any);
    } else if (/*context.explicit && */!doNotCompleteAfterConstant.includes(nodeBefore.name)) {
      return completePropertiesMethod(context.pos, {} as any);
    }
    return null
  }
}
