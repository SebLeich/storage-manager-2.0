import { createSelector } from '@ngrx/store';
import { featureKey, State } from '../reducers/solution.reducers';
import { ISolution } from '../../interfaces/solution.interface';
import { IGood } from '../../interfaces/good.interface';

const solutionsState = (state: any) => state[featureKey] as State;

export const selectCurrentSolution = createSelector(
  solutionsState,
  (state: State) => state.entities[state.selectedSolutionId as any] ?? null
);

export const selectNextSolutionId = createSelector(
  solutionsState,
  (state: State) => {

    if (typeof state.selectedSolutionId === 'string') {
      const index = Object.values(state.entities).findIndex((entry) => entry!.id === state.selectedSolutionId);
      if (index === state.ids.length - 1) {
        return state.ids[0];
      }
      return state.ids[index + 1];
    } else if (state.ids.length > 0) {
      return state.ids[0];
    }
    return null;
  }
)

export const selectSolutionById = (solutionGuid: string | null) => createSelector(
  solutionsState,
  (state: State) => {
    const solution = Object.values(state.entities ?? {}).find(solution => solution?.id === solutionGuid);
    return solution ?? null;
  }
);

export const selectSolutionByAlgorithm = (arg: string | null | (() => string | null)) => createSelector(
  solutionsState,
  (state: State) => {
    const algorithm = typeof arg === 'function' ? arg() : arg;
    if (!algorithm) {
      return null;
    }
    const solution = Object.values(state.entities ?? {}).find(solution => solution?.calculationSource?.title === algorithm);
    return solution ?? null;
  }
);

export const selectSolutions = createSelector(
  solutionsState,
  (state: State) => (Object.values(state.entities) as ISolution[]).sort((solutionA, solutionB) => solutionA.calculated > solutionB.calculated ? 1 : -1)
);

export const selectHasMultipleSolutions = createSelector(
  solutionsState,
  (state: State) => Object.values(state.entities).length > 1
);

export const selectCurrentSolutionSteps = createSelector(
  solutionsState,
  (state: State) => {
    const currentSolution = state.entities[state.selectedSolutionId as any] ?? null;
    if (!currentSolution) {
      return null;
    }
    return currentSolution.steps ?? [];
  }
);

export const selectCurrentSolutionGoods = createSelector(
  solutionsState,
  (state: State) => {
    if (typeof state.selectedSolutionId !== 'string') {
      return [];
    }
    const currentSolution = state.entities[state.selectedSolutionId];
    return (currentSolution!.container!.goods ?? []) as IGood[];
  }
);
