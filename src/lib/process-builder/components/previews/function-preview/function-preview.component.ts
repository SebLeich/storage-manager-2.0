import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IFunction } from '../../../globals/i-function';
import { IInputParam } from '../../../globals/i-input-param';
import * as fromIFunction from 'src/lib/process-builder/store/reducers/i-function.reducer';
import { updateIFunction } from '../../../store/actions/i-function.actions';

@Component({
  selector: 'app-function-preview',
  templateUrl: './function-preview.component.html',
  styleUrls: ['./function-preview.component.sass']
})
export class FunctionPreviewComponent implements OnInit {

  @Input() func!: IFunction;

  inputParams: IInputParam[] = [];

  constructor(
    private _funcStore: Store<fromIFunction.State>,
    private _paramStore: Store<fromIFunction.State>
  ) { }

  isNumber = (arg: any) => typeof arg === 'number';

  ngOnInit(): void {
    this.inputParams = Array.isArray(this.func.inputParams) ? this.func.inputParams : typeof this.func.inputParams === 'number' ? [this.func.inputParams] : [];
  }

  updateFunctionDescription(func: IFunction, description: string) {
    let updatedFun = Object.assign({}, func);
    updatedFun.description = description;
    this._funcStore.dispatch(updateIFunction(updatedFun));
  }

}
