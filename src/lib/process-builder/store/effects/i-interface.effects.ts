import { Inject, Injectable, Optional } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IInterface, INTERFACES_CONFIG_TOKEN } from '../../globals/i-interface';
import { addIInterfaces, loadIInterfaces } from '../actions/i-interface.actions';



@Injectable()
export class IInterfaceEffects {

  loadParams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadIInterfaces),
      mergeMap(
        () => {
          return of(addIInterfaces(this._config ?? []));
        }
      )
    )
  );

  constructor(
    @Optional() @Inject(INTERFACES_CONFIG_TOKEN) private _config: IInterface[],
    private actions$: Actions
  ) { }

}
