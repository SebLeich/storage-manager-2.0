import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParamCodes } from 'src/config/param-codes';
import { State } from '../store/reducers/i-param.reducer';
import { selectIParam } from '../store/selectors/i-param.selectors';

@Pipe({
  name: 'param'
})
export class ParamPipe implements PipeTransform {

  notFoundResult = 'not found';

  constructor(private _store: Store<State>){

  }

  transform(value: ParamCodes | null | undefined | 'dynamic'): Observable<string> {
    if(typeof value !== 'number'){
      return of(value === 'dynamic'? 'dynamic': this.notFoundResult);
    }
    return this._store.select(selectIParam(value)).pipe(map(x => x? x.name: this.notFoundResult));
  }

}
