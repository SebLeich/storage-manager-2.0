import { createSelector } from '@ngrx/store';
import { calculationContextFeatureKey, State } from '../reducers/i-calculation-context.reducers';

export const solutionsState = (state: any) => state[calculationContextFeatureKey] as State;

export const selectContainerHeight = createSelector(
  solutionsState,
  (state: State) => state.containerHeight
);

export const selectContainerWidth = createSelector(
  solutionsState,
  (state: State) => state.containerWidth
);

export const selectUnit = createSelector(
  solutionsState,
  (state: State) => state.unit
);

export const selectCalculationContextValid = createSelector(
  solutionsState,
  (state: State) => {
    return !!state.containerWidth && !!state.containerHeight;
  }
);
