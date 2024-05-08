import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, map } from 'rxjs';
import { highlightSolutionNavItem, resetSolutionNavItem } from '../actions/application.actions';

@Injectable()
export class ApplicationEffects {

    handleSolutionHighlighting$ = createEffect(() => this._actions$.pipe(
        ofType(highlightSolutionNavItem),
        delay(5000),
        map(() => resetSolutionNavItem())
    ));

    constructor(private _actions$: Actions) { }

}