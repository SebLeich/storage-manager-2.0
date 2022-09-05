import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, tap } from 'rxjs/operators';
import { downloadCurrentSolution } from '../actions/i-solution.actions';
import * as fromISolutionState from 'src/app/store/reducers/i-solution.reducers';
import { selectCurrentSolution } from '../selectors/i-solution.selectors';


@Injectable()
export class ISolutionEffects {

  downloadCurrentSolution$ = createEffect(() => this.actions$.pipe(
      ofType(downloadCurrentSolution),
      switchMap(() => this._solutionStore.select(selectCurrentSolution)),
      tap((solution) => {
        if (solution) {
          var sJson = JSON.stringify(solution);
          var element = document.createElement('a');
          element.setAttribute('href', `data:text/json;charset=UTF-8,${encodeURIComponent(sJson)}`);
          element.setAttribute('download', `${solution.description}.json`);
          element.style.display = 'none';
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        }
      })
    ),
    { dispatch: false }
  )

  constructor(
    private actions$: Actions,
    private _solutionStore: Store<fromISolutionState.State>
  ) { }

}
