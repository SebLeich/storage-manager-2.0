import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from '../store/reducers/interface.reducer';
import { selectIInterface } from '../store/selectors/interface.selectors';

@Pipe({
  name: 'interface'
})
export class InterfacePipe implements PipeTransform {

  private _notFoundResult = 'not found';
  private _emptyResult = 'no value';

  constructor(private _store: Store<State>) { }

  public transform(value: number | null | undefined): Observable<string> {
    if (typeof value !== 'number') {
      return of(this._emptyResult);
    }

    return this._store.select(selectIInterface(value)).pipe(map(x => x ? x.name : this._notFoundResult));
  }

}
