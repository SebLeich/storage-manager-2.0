import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State, FEATURE_KEY } from "./calculation.reducer";

export const selectCalculationState = createFeatureSelector<State>(FEATURE_KEY);

export const selectContainerHeight = createSelector(
    selectCalculationState,
    state => state.containerHeight
);

export const selectContainerWidth = createSelector(
    selectCalculationState,
    state => state.containerWidth
);

export const selectSolutionWrappers = createSelector(
    selectCalculationState,
    state => state.solutionWrappers
);