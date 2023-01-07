import { Injectable, inject, Inject } from '@angular/core';
import { scan, distinctUntilChanged, map, switchMap, shareReplay } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { of, Observable } from 'rxjs';
import * as fromIParam from 'src/lib/process-builder/store/reducers/param.reducer';
import * as fromIFunction from 'src/lib/process-builder/store/reducers/function.reducer';
import { Store } from '@ngrx/store';
import { selectIParam, selectIParams } from 'src/lib/process-builder/store/selectors/param.selectors';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IParamEditorComponentInputData } from '../../../../interfaces/i-param-editor-component-input-data.interface';
import { IParam } from 'src/lib/process-builder/globals/i-param';
import { selectIFunctionsByOutputParam } from 'src/lib/process-builder/store/selectors/function.selector';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js.repository';
import { ProcessBuilderRepository } from 'src/lib/core/process-builder-repository';
import { mapIParamInterfaces } from 'src/lib/process-builder/extensions/rxjs/map-i-param-interfaces.rxjs';
import { upsertProvider } from 'src/lib/process-builder/store/actions/injection-context.actions';

@Injectable({
  providedIn: 'root',
})
export class ParamEditorComponentService {
  public paramObject$ = inject(Store<fromIParam.State>).select(
    selectIParam(() => this.data.paramCode)
  );
  public paramObjectPseudoObject$: Observable<object> = this.paramObject$.pipe(
    mapIParamInterfaces(this._store),
    switchMap((paramObject: IParam | null | undefined) => {
      if (paramObject) {
        return of(ProcessBuilderRepository.createPseudoObjectFromIParam(paramObject));
      }
      return of({});
    })
  );
  public formGroup$ = this.paramObject$.pipe(
    scan(
      (formGroup, iParam) => {
        if (iParam) {
          formGroup.patchValue(iParam, { emitEvent: false });
        }
        return formGroup;
      },
      inject(FormBuilder).group<IParam>({
        name: '',
        identifier: 0,
        defaultValue: null,
        normalizedName: '',
        _isIParam: true,
        type: 'object',
        typeDef: [],
        interface: null,
        constant: null,
        isProcessOutput: undefined,
        nullable: null,
        optional: null,
      })
    ),
    distinctUntilChanged(),
    shareReplay()
  );
  public formGroupIsPristine$ = this.formGroup$.pipe(
    map((formGroup) => formGroup.pristine)
  );
  public currentParamIsConstant$ = this.paramObject$.pipe(
    map((param) => !!param?.constant)
  );
  public computable$ = this.currentParamIsConstant$.pipe(map((x) => !x));
  public paramIsProducedByFunctions$ = this.paramObject$.pipe(
    switchMap((param) => {
      if (!param) return of([]);
      return inject(Store<fromIFunction.State>).select(
        selectIFunctionsByOutputParam(param)
      );
    })
  );
  public availableInputParams$ = inject(Store).select(
    selectIParams(() => BPMNJsRepository.getAvailableInputParams(this.data.element))
  );
  public defaultValueControl$ = this.formGroup$.pipe(
    map((formGroup) => formGroup.controls['defaultValue'])
  );
  public nameControl$ = this.formGroup$.pipe(
    map((formGroup) => formGroup.controls['name'])
  );
  public normalizedNameControl$ = this.formGroup$.pipe(
    map((formGroup) => formGroup.controls['normalizedName'])
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IParamEditorComponentInputData,
    private _store: Store,
  ) { }

  public updateInjector(iParams: IParam[]): void {
    for (let param of iParams) {
      const value = ProcessBuilderRepository.createPseudoObjectFromIParamDefinition(param!.defaultValue), interfaceObject = ProcessBuilderRepository.createPseudoObjectFromIParamDefinition(param!.defaultValue);
      this._store.dispatch(upsertProvider(param!.normalizedName, value, interfaceObject));
    }
  }
}
