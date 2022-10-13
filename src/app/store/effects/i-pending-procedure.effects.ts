import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { announceProcedure, updateGlobalProcedureProgress, updateProcedure } from '../actions/i-pending-procedure.actions';



@Injectable()
export class IPendingProcedureEffects {

    updateGlobalProcedureProgress$ = createEffect(() => this._actions$.pipe(
        ofType(announceProcedure, updateProcedure),
        map(() => {
            return updateGlobalProcedureProgress();
        })
    ));

    constructor(private _actions$: Actions) { }

}
