import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FEATURE_KEY, State } from "./visualization.reducer";

export const VISUALIZATION_STATE = createFeatureSelector<State>(FEATURE_KEY);

export const selectCurrentSolutionWrapper = createSelector(
    VISUALIZATION_STATE,
    (state: State) => state.solutionWrapper
);

export const selectCurrentSolutionGroups = createSelector(
    selectCurrentSolutionWrapper,
    (solutionWrapper) => solutionWrapper?.groups ?? []
);


export const selectCurrentSolution = createSelector(
    selectCurrentSolutionWrapper,
    (solutionWrapper) => solutionWrapper?.solution
);

export const selectCurrentSolutionCalculationDate = createSelector(
    selectCurrentSolution,
    (solution) => solution?.calculated
);

export const selectCurrentSolutionDescription = createSelector(
    selectCurrentSolution,
    (solution) => solution?.description
);

export const selectCurrentSolutionCalculationSource = createSelector(
    selectCurrentSolution,
    (solution) => solution?.calculationSource
);

export const selectCurrentSolutionCalculationSourceTitle = createSelector(
    selectCurrentSolutionCalculationSource,
    (calculationSource) => calculationSource?.title
);

export const selectCurrentSolutionContainer = createSelector(
    selectCurrentSolution,
    (solution) => solution?.container
);

export const selectCurrentSolutionValidation = createSelector(
    VISUALIZATION_STATE,
    (state: State) => state.validation
);