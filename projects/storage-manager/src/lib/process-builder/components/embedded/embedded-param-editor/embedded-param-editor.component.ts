import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Inject, OnDestroy, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import JSONEditor from 'jsoneditor';
import { combineLatest, ReplaySubject, Subscription } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';
import { ProcessBuilderRepository } from 'src/lib/core/process-builder-repository';
import { IEmbeddedView } from 'src/lib/process-builder/classes/embedded-view';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/process-builder-config.interface';
import { TaskCreationFormGroup } from 'src/lib/process-builder/interfaces/task-creation-form-group-value.interface';

@Component({
  selector: 'app-embedded-param-editor',
  templateUrl: './embedded-param-editor.component.html',
  styleUrls: ['./embedded-param-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmbeddedParamEditorComponent implements IEmbeddedView, AfterViewInit, OnDestroy {

  @ViewChild('parameterBody', { static: true, read: ElementRef }) private parameterBody!: ElementRef<HTMLDivElement>;
  @Output() public editorBlurred = new EventEmitter<void>();
  @Output() public jsonChanged = new EventEmitter<object>();

  public formGroup = new FormGroup({
    functionName: new FormControl<string>(''),
    outputIsProcessOutput: new FormControl<boolean>(false),
    outputParamName: new FormControl<string>(''),
  }) as TaskCreationFormGroup;

  private _instance: JSONEditor | undefined;
  private _editor$$ = new ReplaySubject<JSONEditor>(1);
  public editor$ = this._editor$$.asObservable();

  private _subscription: Subscription = new Subscription();

  constructor(@Inject(PROCESS_BUILDER_CONFIG_TOKEN) public config: IProcessBuilderConfig) { }

  public blurEditor = () => this.editorBlurred.emit();

  public ngAfterViewInit(): void {
    this._subscription.add(this.jsonChanged.pipe(debounceTime(500))
      .subscribe((json) => {
        const extracted: any = ProcessBuilderRepository.extractObjectTypeDefinition(json as any);
        this.formGroup.controls.outputParamName!.setValue(extracted);
      }));

    this._subscription.add(
      combineLatest([this.editor$, this.formGroup.controls.outputParamName!.valueChanges.pipe(startWith(this.formGroup.controls.outputParamName!.value))])
        .pipe(debounceTime(100))
        .subscribe(([editor, param]: [JSONEditor, any]) => {
          const obj = ProcessBuilderRepository.createPseudoObjectFromIParamDefinition(param);
          editor.set(obj ?? {});
          editor.expandAll();
        })
    );

    this._instance = new JSONEditor(this.parameterBody.nativeElement, { 'onChangeJSON': (value: object) => this.jsonChanged.emit(value) });
    this._editor$$.next(this._instance);
  }

  public ngOnDestroy() {
    const obj = this._instance?.get();
    this.formGroup.controls['outputParamName']!.setValue(obj ? ProcessBuilderRepository.extractObjectTypeDefinition(obj) as any : null);
    this._subscription.unsubscribe();
  }

}
