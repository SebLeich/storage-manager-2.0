import { createSelector } from "@ngrx/store";
import { solutionPreviewFeatureKey, State } from "../reducers/solution-preview.reducers";

const solutionsState = (state: any) => state[solutionPreviewFeatureKey] as State;

export const selectSolutionPreview = (arg: string | (() => string)) => createSelector(
  solutionsState,
  (state: State) => {
    const solutionId = typeof arg === 'function' ? arg() : arg;
    return state.entities[solutionId];
  }
);
