import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from '../store/reducers/i-interface.reducer';
import { selectIInterface } from '../store/selectors/i-interface.selectors';

@Pipe({
  name: 'interface'
})
export class InterfacePipe implements PipeTransform {

  notFoundResult = 'not found';
  emptyResult = 'no value';

  constructor(private _store: Store<State>){

  }

  transform(value: number | null | undefined): Observable<string> {
    if(typeof value !== 'number') return of(this.emptyResult);
    return this._store.select(selectIInterface(value)).pipe(map(x => x? x.name: this.notFoundResult));
  }

}
