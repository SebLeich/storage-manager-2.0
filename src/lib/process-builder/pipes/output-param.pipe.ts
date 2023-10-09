import { Pipe, PipeTransform } from '@angular/core';
import { IFunction, IInterface, IParam } from '../interfaces';
import { Observable, map, of } from 'rxjs';
import { selectIInterface, selectIParam } from '../store/selectors';
import { Store } from '@ngrx/store';

@Pipe({
  name: 'outputParam'
})
export class OutputParamPipe implements PipeTransform {

  constructor(private _store: Store) { }

  public transform(functionObject?: IFunction | null): Observable<string> {
    return this._getFunctionOutput(functionObject).pipe(map((output) => typeof output === 'string' ? output : output?.name ?? ''));
  }

  private _getFunctionOutput(functionObject?: IFunction | null): Observable<string | null | IInterface | IParam> {
    if (!functionObject) {
      return of('');
    }

    const useInterface = typeof functionObject?.outputTemplate === 'string';
    if (useInterface) {
      return functionObject.outputTemplate === 'dynamic' ? of('dynamic') : this._store.select(selectIInterface(functionObject.outputTemplate));
    }

    return this._store.select(selectIParam(functionObject?.output));
  }

}
