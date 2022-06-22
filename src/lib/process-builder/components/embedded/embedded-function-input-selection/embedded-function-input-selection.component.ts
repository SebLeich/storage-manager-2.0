import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParamCodes } from 'src/config/param-codes';
import { IEmbeddedView } from 'src/lib/process-builder/globals/i-embedded-view';
import { IParam } from 'src/lib/process-builder/globals/i-param';
import * as fromIParam from 'src/lib/process-builder/store/reducers/i-param.reducer';
import { selectIParams } from 'src/lib/process-builder/store/selectors/i-param.selectors';

@Component({
  selector: 'app-embedded-function-input-selection',
  templateUrl: './embedded-function-input-selection.component.html',
  styleUrls: ['./embedded-function-input-selection.component.sass']
})
export class EmbeddedFunctionInputSelectionComponent implements IEmbeddedView, OnDestroy, OnInit {

  private _inputParams = new ReplaySubject<ParamCodes[]>(1);

  availableInputParams$ = combineLatest([this._inputParams.asObservable(), this._paramStore.select(selectIParams())]).pipe(
    map(([codes, params]: [ParamCodes[], IParam[]]) => {
      return params.filter(x => codes.indexOf(x.identifier) > -1);
    })
  );

  formGroup!: FormGroup;

  constructor(
    private _paramStore: Store<fromIParam.State>
  ) { }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {

  }

  paramClicked(param: IParam) {
    this.inputParamControl.setValue(this.inputParamControl.value === param.identifier? null: param.identifier);
  }

  setInputParams = (inputParams: ParamCodes[]) => this._inputParams.next(inputParams);

  get inputParamControl(): FormControl {
    return this.formGroup.controls['inputParam'] as FormControl;
  }

}
