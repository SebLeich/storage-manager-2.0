import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State, featureKey } from "./calculation.reducer";

export const selectCalculationState = createFeatureSelector<State>(featureKey);

export const selectContainerHeight = createSelector(
    selectCalculationState,
    state => state.containerHeight
);

export const selectContainerWidth = createSelector(
    selectCalculationState,
    state => state.containerWidth
);