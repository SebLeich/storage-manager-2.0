import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectIParam } from '../store/selectors/param.selectors';

@Pipe({
  name: 'param'
})
export class ParamPipe implements PipeTransform {

  private _emptyResult = 'no value';
  private _notFoundResult = 'not found';

  constructor(private _store: Store) { }

  public transform(value: number | null | undefined | 'dynamic'): Observable<string> {
    if (typeof value !== 'number') {
      return of(value === 'dynamic' ? 'dynamic' : this._emptyResult);
    }

    const selector = this._store.select(selectIParam(value));
    return selector.pipe(map(param => param?.name ?? this._notFoundResult));
  }

}
