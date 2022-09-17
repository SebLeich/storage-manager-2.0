import { createAction, props } from '@ngrx/store';
import { ISolution } from 'src/app/interfaces/i-solution.interface';

export const solutionActions = {
  AddSolution: '[Solution] Add Solution',
  AddSolutions: '[Solution] Add Solutions',
  ClearSolutions: '[Solution] Clear Solution',
  DownloadCurrentSolution: '[Solution] Download Current Solution',
  DuplicateSolution: '[Solution] Duplicate Solution',
  SetDefaultSolution: '[Solution] Set Default Solution',
  RemoveSolution: '[Solution] Remove Solution',
  SetCurrentSolution: '[Solution] Set Current Solution',
  SetNextSolution: '[Solution] Set Next Solution',
  UpdateAlgorithmSolution: '[Solution] Update Algorithm Solution',
  UpdateSolution: '[Solution] Update Solution'
}

export const addSolution = createAction(
  solutionActions.AddSolution,
  props<{ solution: Partial<ISolution> }>()
);

export const addSolutions = createAction(
  solutionActions.AddSolutions,
  props<{ solutions: ISolution[] }>()
);

export const clearSolutions = createAction(
  solutionActions.ClearSolutions
);

export const downloadCurrentSolution = createAction(
  solutionActions.DownloadCurrentSolution
);

export const duplicateSolution = createAction(
  solutionActions.DuplicateSolution,
  props<{ duplicateSolution: ISolution }>()
);

export const setExemplarySolution = createAction(
  solutionActions.SetDefaultSolution
);

export const removeSolution = createAction(
  solutionActions.RemoveSolution,
  props<{ removeSolution: ISolution }>()
);

export const setCurrentSolution = createAction(
  solutionActions.SetCurrentSolution,
  props<{ solution: ISolution | null }>()
);

export const setNextSolution = createAction(
  solutionActions.SetNextSolution
);

export const updateAlgorithmSolution = createAction(
  solutionActions.UpdateAlgorithmSolution,
  props<{ solution: ISolution }>()
)

export const updateSolution = createAction(
  solutionActions.UpdateSolution,
  props<{ solution: ISolution }>()
)
