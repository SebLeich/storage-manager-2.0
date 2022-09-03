import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import JSONEditor from 'jsoneditor';
import { combineLatest, ReplaySubject, Subject, Subscription } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';
import { ProcessBuilderRepository } from 'src/lib/core/process-builder-repository';
import { IEmbeddedView } from 'src/lib/process-builder/globals/i-embedded-view';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/globals/i-process-builder-config';

@Component({
  selector: 'app-embedded-param-editor',
  templateUrl: './embedded-param-editor.component.html',
  styleUrls: ['./embedded-param-editor.component.sass']
})
export class EmbeddedParamEditorComponent implements IEmbeddedView, AfterViewInit, OnDestroy {

  @ViewChild('parameterBody', { static: true, read: ElementRef }) parameterBody!: ElementRef<HTMLDivElement>;

  formGroup!: UntypedFormGroup;

  private _instance: JSONEditor | undefined;
  private _editor = new ReplaySubject<JSONEditor>(1);
  editor$ = this._editor.asObservable();

  private _editorBlurred = new Subject<void>();
  private _jsonChanged = new ReplaySubject<object>(1);
  jsonChanged$ = this._jsonChanged.pipe(debounceTime(500));

  private _subscriptions: Subscription[] = [];

  constructor(
    @Inject(PROCESS_BUILDER_CONFIG_TOKEN) public config: IProcessBuilderConfig
  ) { }

  editorBlurred = () => this._editorBlurred.next();

  ngAfterViewInit(): void {
    this._subscriptions.push(...[
      this.jsonChanged$.pipe(debounceTime(500)).subscribe(json => this.outputParamValueControl.setValue(ProcessBuilderRepository.extractObjectTypeDefinition(json))),
      combineLatest([this.editor$, this.outputParamValueControl.valueChanges.pipe(startWith(this.outputParamValueControl.value))])
        .pipe(debounceTime(100))
        .subscribe(([editor, param]: [JSONEditor, any]) => {
          let obj = ProcessBuilderRepository.createPseudoObjectFromIParamDefinition(param);
          editor.set(obj ?? {});
          editor.expandAll();
        })
    ]);
    this._instance = new JSONEditor(this.parameterBody.nativeElement, {
      'onChangeJSON': (value: object) => this._jsonChanged.next(value),
    });
    this._editor.next(this._instance);
  }

  ngOnDestroy() {
    let obj = this._instance?.get();
    this.formGroup.controls['outputParamValue'].setValue(ProcessBuilderRepository.extractObjectTypeDefinition(obj));
    for (let sub of this._subscriptions) sub.unsubscribe();
    this._subscriptions = [];
  }

  get outputParamValueControl(): UntypedFormControl {
    return this.formGroup.controls['outputParamValue'] as UntypedFormControl;
  }

}
