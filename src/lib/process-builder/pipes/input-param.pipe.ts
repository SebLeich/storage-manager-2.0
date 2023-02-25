import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSnapshot } from '../globals/select-snapshot';
import { IInputParam } from '../interfaces/input-param.interface';
import { selectIInterface } from '../store/selectors/interface.selectors';

@Pipe({
  name: 'inputParam'
})
export class InputParamPipe implements PipeTransform {

  constructor(private _store: Store) { }

  public async transform(param: IInputParam | undefined | null): Promise<string | undefined> {
    if (param) {
      if (param.type === 'object' || param.type === 'array') {
        if (typeof param.interface === 'number') {
          const iFace = await selectSnapshot(this._store.select(selectIInterface(param.interface)));
          if (iFace) {
            const prefix = param.type === 'array' ? 'array of ' : '', suffix = param.type === 'array' ? 's' : '';
            return prefix + iFace.name + suffix;;
          }
        }
      }
      return param.type;
    }
    return undefined;
  }

}
