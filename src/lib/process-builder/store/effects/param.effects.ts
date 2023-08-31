import { Inject, Injectable, Optional } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IParam, PARAMS_CONFIG_TOKEN } from '../../interfaces/param.interface';
import { addIParams, loadIParams } from '../actions/param.actions';



@Injectable()
export class IParamEffects {

  loadParams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadIParams),
      mergeMap(
        () => of(addIParams(this._config ?? []))
      )
    )
  );

  constructor(
    @Optional() @Inject(PARAMS_CONFIG_TOKEN) private _config: IParam[],
    private actions$: Actions
  ) { }

}
