import { createSelector } from '@ngrx/store';
import { calculationAttributesFeatureKey, State } from '../reducers/i-calculation-attribute.reducers';

export const solutionsState = (state: any) => state[calculationAttributesFeatureKey] as State;

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

export const selectCalculationAttributesValid = createSelector(
  solutionsState,
  (state: State) => {
    return state.containerWidth > 0 && state.containerHeight > 0;
  }
);
