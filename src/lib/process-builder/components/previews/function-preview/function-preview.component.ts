import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IFunction } from '../../../globals/i-function';
import { IInputParam } from '../../../globals/i-input-param';
import { updateIFunction } from '../../../store/actions/i-function.actions';

@Component({
  selector: 'app-function-preview',
  templateUrl: './function-preview.component.html',
  styleUrls: ['./function-preview.component.sass']
})
export class FunctionPreviewComponent implements OnInit {

  @Input() public func?: IFunction;

  public inputParams: IInputParam[] = [];
  public finalizesFlowMessage = 'final function';

  constructor(
    private _store: Store
  ) { }

  public isNumber = (arg: any) => typeof arg === 'number';

  public ngOnInit(): void {
    this.inputParams = this.func? Array.isArray(this.func.inputParams) ? this.func.inputParams : typeof this.func.inputParams === 'number' ? [this.func.inputParams] : [] : [];
  }

  public updateFunctionDescription(description: string) {
    if(!this.func){
      return;
    }
    let updatedFun = Object.assign({}, this.func);
    updatedFun.description = description;
    this._store.dispatch(updateIFunction(updatedFun));
  }

}
