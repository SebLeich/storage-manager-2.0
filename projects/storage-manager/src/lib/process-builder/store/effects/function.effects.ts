import { Inject, Injectable, Optional } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { FUNCTIONS_CONFIG_TOKEN, IFunction } from '../../interfaces/function.interface';
import { addIFunctions, loadIFunctions } from '../actions/function.actions';



@Injectable()
export class IFunctionEffects {

  public loadParams$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadIFunctions),
      mergeMap(
        () => of(addIFunctions(this._config ?? []))
      )
    )
  );

  constructor(
    @Optional() @Inject(FUNCTIONS_CONFIG_TOKEN) private _config: IFunction[],
    private _actions$: Actions
  ) { }

}
