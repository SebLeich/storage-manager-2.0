import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, tap } from 'rxjs/operators';
import { clearSolutions, downloadCurrentSolution } from '../actions/i-solution.actions';
import * as fromISolutionState from 'src/app/store/reducers/i-solution.reducers';
import { selectCurrentSolution } from '../selectors/i-solution.selectors';
import { HttpClient } from '@angular/common/http';
import { CsvService } from 'src/app/services/csv.service';
import { setExemplaryInputData, updateCalculationAttributes } from '../actions/i-calculation-attribute.actions';


@Injectable()
export class ISolutionEffects {

  calculationAttributesSetted$ = createEffect(() => this.actions$.pipe(
    ofType(updateCalculationAttributes),
    map(() => clearSolutions())
  ));

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
  );

  setExemplaryInputData$ = createEffect(() => this.actions$.pipe(
    ofType(setExemplaryInputData),
    switchMap(() => this._httpClient.get('./assets/exemplaryInputData.csv', {
      responseType: 'text'
    })),
    map((csv) => {
      const extractedVariables = this._csvService.extractCSVEntities(csv);
      return updateCalculationAttributes(extractedVariables);
    })
  ));

  constructor(
    private actions$: Actions,
    private _solutionStore: Store<fromISolutionState.State>,
    private _httpClient: HttpClient,
    private _csvService: CsvService
  ) { }

}
