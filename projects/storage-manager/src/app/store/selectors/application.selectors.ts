import { createSelector } from '@ngrx/store';
import * as fromApplication from '../reducers/application.reducer';

export const applicationState = (state: any) => state[fromApplication.featureKey] as fromApplication.State;

export const selectSolutionNavItemHighlighted = createSelector(
    applicationState,
    (state: fromApplication.State) => {
        return state.solutionNavItemHighlighted;
    }
);