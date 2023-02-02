import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParamCodes } from 'src/config/param-codes';
import { EmbeddedView } from 'src/lib/process-builder/classes/embedded-view';
import { IParam } from 'src/lib/process-builder/globals/i-param';
import { ITaskCreationFormGroup } from 'src/lib/process-builder/interfaces/i-task-creation.interface';
import * as fromIParam from 'src/lib/process-builder/store/reducers/param.reducer';
import { selectIParams } from 'src/lib/process-builder/store/selectors/param.selectors';

@Component({
  selector: 'app-embedded-function-input-selection',
  templateUrl: './embedded-function-input-selection.component.html',
  styleUrls: ['./embedded-function-input-selection.component.sass']
})
export class EmbeddedFunctionInputSelectionComponent implements EmbeddedView {

  private _inputParams = new ReplaySubject<ParamCodes[]>(1);

  public availableInputParams$ = combineLatest([this._inputParams.asObservable(), this._paramStore.select(selectIParams())]).pipe(
    map(([codes, params]: [ParamCodes[], IParam[]]) => {
      return params.filter(x => codes.indexOf(x.identifier) > -1);
    })
  );

  public formGroup = new FormGroup({
    'inputParam': new FormControl([] as ParamCodes[])
  }) as FormGroup<Partial<ITaskCreationFormGroup>>;

  constructor(private _paramStore: Store<fromIParam.State>) { }

  public paramClicked(param: IParam) {
    this.formGroup.controls.inputParam!.setValue(this.formGroup.controls.inputParam!.value === param.identifier ? null : param.identifier);
  }

  public setInputParams = (inputParams: ParamCodes[]) => this._inputParams.next(inputParams);

}
