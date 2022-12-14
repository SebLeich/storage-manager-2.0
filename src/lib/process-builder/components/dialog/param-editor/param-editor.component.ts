import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import JSONEditor from 'jsoneditor';
import { combineLatest, ReplaySubject, Subject, Subscription } from 'rxjs';
import { ProcessBuilderRepository } from 'src/lib/core/process-builder-repository';
import { IParam } from 'src/lib/process-builder/globals/i-param';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN, } from 'src/lib/process-builder/globals/i-process-builder-config';
import { updateIParam } from 'src/lib/process-builder/store/actions/param.actions';
import { IFunction } from 'src/lib/process-builder/globals/i-function';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime } from 'rxjs/operators';
import { ParamEditorComponentService } from './service/param-editor-component.service';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { injectValues } from 'src/lib/process-builder/store/selectors/injection-context.selectors';

@Component({
  selector: 'app-param-editor',
  templateUrl: './param-editor.component.html',
  styleUrls: ['./param-editor.component.sass'],
  providers: [ParamEditorComponentService],
})
export class ParamEditorComponent implements OnInit, OnDestroy {
  @ViewChild('parameterBody', { static: true, read: ElementRef })
  private set parameterBody(body: ElementRef<HTMLDivElement>) {
    this._paramBody.next(body);
    this._editor.next(
      new JSONEditor(body.nativeElement, {
        onChangeJSON: (value: object) => {
          return this._jsonChanged.next(value);
        },
      })
    );
  }
  private _paramBody = new ReplaySubject<ElementRef<HTMLDivElement>>(1);
  private _editor = new ReplaySubject<JSONEditor>(1);
  private _jsonChanged = new Subject<object>();

  jsonChanged$ = this._jsonChanged.pipe(debounceTime(500));

  selectedIndex: number = 0;

  private _subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(PROCESS_BUILDER_CONFIG_TOKEN) public config: IProcessBuilderConfig,
    private _ref: MatDialogRef<ParamEditorComponent>,
    private _store: Store,
    public paramEditorComponentService: ParamEditorComponentService,
    private _snackBar: MatSnackBar,
  ) { }

  public async calculateFunctionOutput(func: IFunction) {
    const formGroup = await selectSnapshot(this.paramEditorComponentService.formGroup$);
    if (func.customImplementation) {
      const injector = this._store.select(injectValues())
      const output = await ProcessBuilderRepository.calculateCustomImplementationOutput(func.customImplementation, injector);
      const outputIParamDefinitions = ProcessBuilderRepository.extractObjectTypeDefinition(output);

      formGroup.controls['typeDef']?.setValue(outputIParamDefinitions);
      formGroup.controls['typeDef']?.markAsDirty();

      this._store.dispatch(updateIParam(formGroup.value as IParam));

      this._snackBar.open(`param recalculated successfully`, 'Ok', {
        duration: 2000,
      });
      this.selectedIndex = 0;
    } else if (typeof func.pseudoImplementation === 'function') {
      let result = func.pseudoImplementation();
      console.log(result);
    }
  }

  public async close() {
    const formGroup = await selectSnapshot(this.paramEditorComponentService.formGroup$);
    if (formGroup.dirty) {
      const editor = await selectSnapshot(this._editor);
      const parsedValue = ProcessBuilderRepository.extractObjectTypeDefinition(
        editor.get()
      );
      formGroup.controls['defaultValue'].setValue(parsedValue);
      formGroup.controls['normalizedName'].setValue(
        ProcessBuilderRepository.normalizeName(formGroup.controls['name']?.value)
      );

      this._store.dispatch(updateIParam(formGroup.value as IParam));
      this._snackBar.open(`param saved`, 'Ok', { duration: 2000 });
    }

    this._ref.close();
  }

  public ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  public ngOnInit(): void {
    this._subscriptions.add(this.paramEditorComponentService.availableInputParams$.subscribe((iParams) => this.paramEditorComponentService.updateInjector(iParams)));
    this._subscriptions.add(
      combineLatest([
        this._editor,
        this.paramEditorComponentService.paramObjectPseudoObject$,
      ]).subscribe(([editor, pseudoObject]: [JSONEditor, object]) => {
        editor.set(pseudoObject);
        editor.expandAll();
      })
    );
    this._subscriptions.add(
      combineLatest([this.paramEditorComponentService.formGroup$, this.jsonChanged$])
        .subscribe(([formGroup, pseudoObject]) => {
          const iParam = ProcessBuilderRepository.extractObjectTypeDefinition(pseudoObject) as IParam;
          formGroup.controls['typeDef']?.setValue(iParam.typeDef);
          formGroup.controls['interface'].setValue(null);
          formGroup.controls['typeDef']?.markAsDirty();
          formGroup.controls['interface'].markAsDirty();
        })
    );
  }
}
