import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import { IGoodsProvider, IGroupsProvider } from "src/app/interfaces";
import { setNextSolution } from "src/app/store/actions/i-solution.actions";
import { selectCurrentSolution, selectCurrentSolutionGroups } from "src/app/store/selectors/i-solution.selectors";

import * as fromISolutionState from 'src/app/store/reducers/i-solution.reducers';
import { Observable } from "rxjs";
import { IGroup } from "src/app/interfaces/i-group.interface";

@Injectable()
export class SolutionPreviewComponentService implements IGroupsProvider, IGoodsProvider {

    groups$ = this._solutionStore.select(selectCurrentSolutionGroups) as Observable<IGroup[]>;
    goods$ = this._solutionStore.select(selectCurrentSolution).pipe(map(solution => solution?.container?.goods ?? []));

    constructor(
        private _solutionStore: Store<fromISolutionState.State>,
    ) { }

    nextSolution() {
        this._solutionStore.dispatch(setNextSolution());
    }

}