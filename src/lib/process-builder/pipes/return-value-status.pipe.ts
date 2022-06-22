import { Pipe, PipeTransform } from '@angular/core';
import { MethodEvaluationStatus } from '../globals/method-evaluation-status';

@Pipe({
  name: 'returnValueStatus'
})
export class ReturnValueStatusPipe implements PipeTransform {

  private _map: any = {};

  constructor() {
    this._map[MethodEvaluationStatus.Calculating] = 'calculating';
    this._map[MethodEvaluationStatus.Initial] = 'initial';
    this._map[MethodEvaluationStatus.NoMainMethodFound] = 'no main method';
    this._map[MethodEvaluationStatus.NoReturnValue] = 'no return value';
    this._map[MethodEvaluationStatus.ReturnValueFound] = 'has return value';
  }

  transform(value: MethodEvaluationStatus | null): string {
    if (!value) return 'no status';
    return this._map[value] ?? 'unknown status';
  }

}
