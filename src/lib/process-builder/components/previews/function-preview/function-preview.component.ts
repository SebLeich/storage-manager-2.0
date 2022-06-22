import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IFunction } from '../../../globals/i-function';
import { IInputParam } from '../../../globals/i-input-param';
import * as fromIFunction from 'src/lib/process-builder/store/reducers/i-function.reducer';
import { removeIFunction, updateIFunction } from '../../../store/actions/i-function.actions';
import { selectIFunctionsByOutputParam } from '../../../store/selectors/i-function.selector';
import { removeIParam } from '../../../store/actions/i-param.actions';
import { take } from 'rxjs/operators';

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

  ngOnInit(): void {
    this.inputParams = Array.isArray(this.func.inputParams) ? this.func.inputParams : typeof this.func.inputParams === 'number' ? [this.func.inputParams] : [];
  }

  removeFunction() {
    if (typeof this.func.output?.param === 'number') {
      this._funcStore.select(selectIFunctionsByOutputParam(this.func.output.param)).pipe(take(1)).subscribe(arg => {
        if (arg.length === 1 && arg[0].identifier === this.func.identifier) this._paramStore.dispatch(removeIParam(this.func.output!.param as number));
        this._funcStore.dispatch(removeIFunction(this.func));
      });
    } else this._funcStore.dispatch(removeIFunction(this.func));
  }

  updateFunctionDescription(func: IFunction, description: string) {
    let updatedFun = Object.assign({}, func);
    updatedFun.description = description;
    this._funcStore.dispatch(updateIFunction(updatedFun));
  }

}
