import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import JSONEditor from 'jsoneditor';
import { combineLatest, Observable, of, ReplaySubject, Subject, Subscription } from 'rxjs';
import { ParamCodes } from 'src/config/param-codes';
import { ProcessBuilderRepository } from 'src/lib/core/process-builder-repository';
import { IParam } from 'src/lib/process-builder/globals/i-param';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/globals/i-process-builder-config';
import { updateIParam } from 'src/lib/process-builder/store/actions/i-param.actions';
import * as fromIParam from 'src/lib/process-builder/store/reducers/i-param.reducer';
import * as fromIFunction from 'src/lib/process-builder/store/reducers/i-function.reducer';
import { selectIParam, selectIParams } from 'src/lib/process-builder/store/selectors/i-param.selectors';
import { selectIFunctionsByOutputParam } from 'src/lib/process-builder/store/selectors/i-function.selector';
import { IFunction } from 'src/lib/process-builder/globals/i-function';
import { INJECTOR_INTERFACE_TOKEN, INJECTOR_TOKEN } from 'src/lib/process-builder/globals/injector';
import { InjectorInterfacesProvider, InjectorProvider } from 'src/lib/process-builder/globals/injector-interfaces-provider';
import { HttpClient } from '@angular/common/http';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js-repository';
import { IElement } from 'src/lib/bpmn-io/i-element';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, map, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-param-editor',
  templateUrl: './param-editor.component.html',
  styleUrls: ['./param-editor.component.sass'],
  providers: [
    {
      provide: INJECTOR_INTERFACE_TOKEN, useFactory: () => {
        return {
          injector: {
            'httpClient': InjectorInterfacesProvider.httpClient(),
            'httpExtensions': InjectorInterfacesProvider.httpExtensions(),
            'rxjs': InjectorInterfacesProvider.rxjs()
          }
        }
      }
    },
    {
      provide: INJECTOR_TOKEN, useFactory: (httpClient: HttpClient) => {
        return {
          'httpClient': httpClient,
          'httpExtensions': InjectorProvider.httpExtensions(),
          'rxjs': InjectorProvider.rxjs()
        }
      }, deps: [HttpClient]
    }
  ]
})
export class ParamEditorComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild('parameterBody', { static: true, read: ElementRef }) parameterBody!: ElementRef<HTMLDivElement>;

  formGroup!: FormGroup;

  private _editor = new ReplaySubject<JSONEditor>(1);
  editor$ = this._editor.asObservable();

  private _jsonChanged = new Subject<object>();
  jsonChanged$ = this._jsonChanged.pipe(debounceTime(100));

  paramObject$: Observable<IParam | null | undefined> = this._paramStore.select(selectIParam(() => this.data.paramCode));
  constantParam$ = this.paramObject$.pipe(map(x => x?.constant ? true : false));
  computable$ = this.constantParam$.pipe(map(x => !x));
  producingFunctions$: Observable<IFunction[]> = this.paramObject$.pipe(switchMap(param => {
    if (!param) return of([]);
    return this._functionStore.select(selectIFunctionsByOutputParam(param));
  }));

  selectedIndex: number = 0;

  private _subscriptions: Subscription[] = [];

  constructor(
    private _paramStore: Store<fromIParam.State>,
    private _functionStore: Store<fromIFunction.State>,
    private _ref: MatDialogRef<ParamEditorComponent>,
    @Inject(INJECTOR_INTERFACE_TOKEN) private _injectorInterface: { injector: object },
    @Inject(INJECTOR_TOKEN) private _injector: { injector: object },
    @Inject(MAT_DIALOG_DATA) public data: { paramCode: ParamCodes | 'dynamic', element: IElement },
    @Inject(PROCESS_BUILDER_CONFIG_TOKEN) public config: IProcessBuilderConfig,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder
  ) {
    this.formGroup = this._formBuilder.group({
      'name': null,
      'identifier': null,
      'value': null,
      'normalizedName': null
    });
    let inputParams = BPMNJsRepository.getAvailableInputParams(this.data.element);
    this._paramStore.select(selectIParams(inputParams)).pipe(take(1)).subscribe((params: IParam[]) => {
      for (let param of params) {
        (this._injector as any)[param!.normalizedName] = ProcessBuilderRepository.convertIParamKeyValuesToPseudoObject(param!.value);
        (this._injectorInterface.injector as any)[param!.normalizedName] = ProcessBuilderRepository.convertIParamKeyValuesToPseudoObject(param!.value);
      }
    });
  }

  calculateFunctionOutput(func: IFunction) {
    if (func.customImplementation) {
      let jsText = func.customImplementation.join('\n');
      let result: Promise<any> = eval.call(window, `(${jsText})`)(this._injector);
      result.then((value: any) => {
        this.valueControl.setValue(ProcessBuilderRepository.extractObjectIParams(value));
        this.valueControl.markAsDirty();
        this._paramStore.dispatch(updateIParam(this.formGroup.value));
        this._snackBar.open(`param recalculated successfully`, 'Ok', { duration: 2000 });
        this.selectedIndex = 0;
      });
    } else {
      let result = func.pseudoImplementation();
      console.log(result);
    }
  }

  close() {
    if (this.formGroup.pristine) {
      this._ref.close();
      return;
    }
    this.editor$.pipe(take(1)).subscribe(editor => {
      let parsedValue = ProcessBuilderRepository.extractObjectIParams(editor.get());
      this.valueControl.setValue(parsedValue);
      this.normalizedNameControl.setValue(ProcessBuilderRepository.normalizeName(this.nameControl.value));
      this._paramStore.dispatch(updateIParam(this.formGroup.value));
      this._snackBar.open(`param saved`, 'Ok', { duration: 2000 });
      this._ref.close();
    });
  }

  ngAfterViewInit(): void {
    this._subscriptions.push(...[
      combineLatest([this.editor$.pipe(take(1)), this.paramObject$])
        .subscribe(([editor, param]: [JSONEditor, IParam | null | undefined]) => {
          let converted = param ? ProcessBuilderRepository.convertIParamKeyValuesToPseudoObject(param.value) : {};
          editor.set(converted);
          editor.expandAll();
        })
    ]);
    let instance = new JSONEditor(this.parameterBody.nativeElement, {
      'onChangeJSON': (value: object) => this._jsonChanged.next(value)
    });
    this._editor.next(instance);
  }

  ngOnDestroy(): void {
    for (let sub of this._subscriptions) sub.unsubscribe();
    this._subscriptions = [];
  }

  ngOnInit(): void {
    this._paramStore.select(selectIParam(this.data.paramCode)).subscribe(param => {
      if (!param) return;
      this.formGroup.patchValue(param);
    });
  }

  get nameControl() {
    return this.formGroup.controls['name'];
  }
  get normalizedNameControl() {
    return this.formGroup.controls['normalizedName'];
  }
  get processTypeIdentifierControl() {
    return this.formGroup.controls['processTypeIdentifier'];
  }
  get valueControl() {
    return this.formGroup.controls['value'];
  }

}
