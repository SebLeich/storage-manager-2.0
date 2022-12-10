import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectIParam } from '../store/selectors/param.selectors';

@Pipe({
  name: 'param'
})
export class ParamPipe implements PipeTransform {

  notFoundResult = 'not found';

  constructor(private _store: Store){ }

  transform(value: number | null | undefined | 'dynamic'): Observable<string> {
    if(typeof value !== 'number'){
      return of(value === 'dynamic'? 'dynamic': this.notFoundResult);
    }
    const selector = this._store.select(selectIParam(value));
    return selector.pipe(map(param => {
      if(param){
        return param.name;
      }
      return this.notFoundResult;
    }));
  }

}
