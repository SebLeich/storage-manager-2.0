import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { autocompletion, CompletionContext, CompletionResult } from '@codemirror/autocomplete';
import { basicSetup, EditorView } from '@codemirror/basic-setup';
import { javascript } from '@codemirror/lang-javascript';
import { lintGutter } from '@codemirror/lint';
import { EditorState, Text } from '@codemirror/state';
import defaultImplementation from 'src/lib/process-builder/globals/default-implementation';
import { syntaxTree } from "@codemirror/language";
import { RxjsPipeCompletionProvider } from '../../completion-providers/rxjs-pipe.completion-provider';
import { HttpClientCompletionProvider } from '../../completion-providers/http-client.completion-provider';
import { InputsCompletionProvider } from '../../completion-providers/inputs.completion-provider';

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
  @ViewChild('codeBody', { static: true, read: ElementRef }) public codeBody!: ElementRef<HTMLDivElement>;
  @ViewChild('.cm-content', { static: false, read: ElementRef }) public codeMirrorContent!: ElementRef<HTMLDivElement>;

  @Input() public inputParams: { [param: string]: object | string | number } | null = null;

  public implementation: Text = Text.of(defaultImplementation);
  private _onTouched?: (value: Text) => void;
  private _onChange?: (value: Text) => void;
  private _codeMirror?: EditorView;

  constructor(private _renderer: Renderer2) { }

  public ngOnInit(): void {
    this._codeMirror = new EditorView({
      state: this._state,
      parent: this.codeBody.nativeElement
    });
  }

  public registerOnChange(fn: (implementation: Text) => void): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: (implementation: Text) => void): void {
    this._onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    if (this.codeMirrorContent) {
      this._renderer.setAttribute(this.codeMirrorContent.nativeElement, 'contenteditable', (!isDisabled).toString());
    }
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
    if (this._codeMirror) {
      this._codeMirror.setState(this._state);
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

  private _complete = async (context: CompletionContext) => {
    const nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1);
    const completions = [
      ...await new RxjsPipeCompletionProvider().provideCompletions(context),
      ...await new HttpClientCompletionProvider().provideCompletions(context),
      ...await new InputsCompletionProvider(this.inputParams).provideCompletions(context),
    ];

    return {
      from: nodeBefore.from,
      options: completions,
      filter: false
    } as CompletionResult;
  }
}
