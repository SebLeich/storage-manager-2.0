import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { announceProcedure, announceProcedures, updateGlobalProcedureProgress, updateProcedure, upsertProcedure } from '../actions/pending-procedure.actions';



@Injectable()
export class IPendingProcedureEffects {

    public updateGlobalProcedureProgress$ = createEffect(() => this._actions$.pipe(
        ofType(announceProcedure, announceProcedures, updateProcedure, upsertProcedure),
        map(() => {
            return updateGlobalProcedureProgress();
        })
    ));

    constructor(private _actions$: Actions) { }

}
