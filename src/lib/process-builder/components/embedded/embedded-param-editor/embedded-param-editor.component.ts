import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import JSONEditor from 'jsoneditor';
import { combineLatest, ReplaySubject, Subject, Subscription } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';
import { ProcessBuilderRepository } from 'src/lib/core/process-builder-repository';
import { EmbeddedView } from 'src/lib/process-builder/classes/embedded-view';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/globals/i-process-builder-config';
import { ITaskCreationFormGroup } from 'src/lib/process-builder/interfaces/task-creation.interface';

@Component({
  selector: 'app-embedded-param-editor',
  templateUrl: './embedded-param-editor.component.html',
  styleUrls: ['./embedded-param-editor.component.scss']
})
export class EmbeddedParamEditorComponent implements EmbeddedView, AfterViewInit, OnDestroy {

  @ViewChild('parameterBody', { static: true, read: ElementRef }) parameterBody!: ElementRef<HTMLDivElement>;

  public formGroup = new FormGroup({
    isProcessOutput: new FormControl<boolean>(false),
    name: new FormControl<string>(''),
    outputParamName: new FormControl<string>(''),
  }) as FormGroup<Partial<ITaskCreationFormGroup>>;

  private _instance: JSONEditor | undefined;
  private _editor = new ReplaySubject<JSONEditor>(1);
  public editor$ = this._editor.asObservable();

  private _editorBlurred = new Subject<void>();
  private _jsonChanged = new ReplaySubject<object>(1);
  public jsonChanged$ = this._jsonChanged.pipe(debounceTime(500));

  private _subscriptions: Subscription = new Subscription();

  constructor(@Inject(PROCESS_BUILDER_CONFIG_TOKEN) public config: IProcessBuilderConfig) { }

  public editorBlurred = () => this._editorBlurred.next();

  public ngAfterViewInit(): void {
    this._subscriptions.add(...[
      this.jsonChanged$
        .pipe(debounceTime(500))
        .subscribe((json) => {
          const extracted: any = ProcessBuilderRepository.extractObjectTypeDefinition(json);
          this.formGroup.controls.outputParamName!.setValue(extracted);
        }),
      combineLatest([this.editor$, this.formGroup.controls.outputParamName!.valueChanges.pipe(startWith(this.formGroup.controls.outputParamName!.value))])
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

  public ngOnDestroy() {
    const obj = this._instance?.get();
    this.formGroup.controls['outputParamName']!.setValue(obj ? ProcessBuilderRepository.extractObjectTypeDefinition(obj) as any : null);
    this._subscriptions.unsubscribe();
  }

}
