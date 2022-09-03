import { createAction, props } from '@ngrx/store';
import { ISolution } from 'src/app/interfaces/i-solution.interface';

export const solutionActions = {
  AddSolution: '[Solution] Add Solution',
  AddSolutions: '[Solution] Add Solutions',
  DownloadCurrentSolution: '[Solution] Download Current Solution',
  RouteToSolution: '[Solution] Route To Solution',
  SetCurrentSolution: '[Solution] Set Current Solution',
  SetNextSolution: '[Solution] Set Next Solution'
}

export const addSolution = createAction(
  solutionActions.AddSolution,
  props<{ solution: Partial<ISolution> }>()
);

export const addSolutions = createAction(
  solutionActions.AddSolutions,
  props<{ solutions: ISolution[] }>()
);

export const downloadCurrentSolution = createAction(
  solutionActions.DownloadCurrentSolution
);

export const duplicateSolution = createAction(
  solutionActions.SetCurrentSolution,
  props<{ duplicateSolution: ISolution }>()
);

export const removeSolution = createAction(
  solutionActions.SetCurrentSolution,
  props<{ removeSolution: ISolution }>()
);

export const setCurrentSolution = createAction(
  solutionActions.SetCurrentSolution,
  props<{ solution: ISolution | null }>()
);

export const setNextSolution = createAction(
  solutionActions.SetNextSolution
);
