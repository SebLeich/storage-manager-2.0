import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IFunction } from '../../../interfaces/function.interface';
import { IInputParam } from '../../../interfaces/input-param.interface';
import { updateIFunction } from '../../../store/actions/function.actions';

@Component({
  selector: 'app-function-preview',
  templateUrl: './function-preview.component.html',
  styleUrls: ['./function-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FunctionPreviewComponent implements OnInit {

  public useInterface = false;
  public interface: number | undefined;
  public param: number | 'dynamic' | undefined;

  private _func: IFunction | undefined;
  @Input() public set func(func: IFunction | undefined) {
    this._func = func;
    this.useInterface = typeof func?.outputTemplate === 'number';
    this.interface = this.useInterface ? func?.outputTemplate as number : undefined;
    this.param = this.useInterface ? undefined : func?.output as number;
  }
  public get func() {
    return this._func;
  }

  public inputParams: (IInputParam | 'dynamic')[] = [];

  constructor(private _store: Store) { }

  public isNumber = (arg: any) => typeof arg === 'number';

  public ngOnInit(): void {
    this.inputParams = this.func ? Array.isArray(this.func.inputTemplates) ? this.func.inputTemplates : typeof this.func.inputTemplates === 'number' ? [this.func.inputTemplates] : [] : [];
  }

  public updateFunctionDescription(description: string) {
    if (!this.func) {
      return;
    }
    let updatedFun = Object.assign({}, this.func);
    updatedFun.description = description;
    this._store.dispatch(updateIFunction(updatedFun));
  }

}
