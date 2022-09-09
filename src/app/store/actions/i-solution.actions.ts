import { createAction, props } from '@ngrx/store';
import { IGroup } from 'src/app/interfaces/i-group.interface';
import { ISolution } from 'src/app/interfaces/i-solution.interface';

export const solutionActions = {
  AddSolution: '[Solution] Add Solution',
  AddSolutions: '[Solution] Add Solutions',
  ClearSolutions: '[Solution] Clear Solution',
  DownloadCurrentSolution: '[Solution] Download Current Solution',
  SetDefaultSolution: '[Solution] Set Default Solution',
  RouteToSolution: '[Solution] Route To Solution',
  SetCurrentSolution: '[Solution] Set Current Solution',
  SetNextSolution: '[Solution] Set Next Solution',
  UpdateAlgorithmSolution: '[Solution] Update Algorithm Solution',
  UpdateCurrentSolutionGroupColor: '[Solution] Update Current Solution Group Color',
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
  solutionActions.SetCurrentSolution,
  props<{ duplicateSolution: ISolution }>()
);

export const setDefaultSolution = createAction(
  solutionActions.SetDefaultSolution
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

export const updateAlgorithmSolution = createAction(
  solutionActions.UpdateAlgorithmSolution,
  props<{ solution: ISolution }>()
)

export const updateCurrentSolutionGroupColor = createAction(
  solutionActions.UpdateCurrentSolutionGroupColor,
  props<{ group: IGroup; color: string }>()
)

export const updateSolution = createAction(
  solutionActions.UpdateSolution,
  props<{ solution: ISolution }>()
)
