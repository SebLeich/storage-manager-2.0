import { createAction, props } from '@ngrx/store';

export const solutionActions = {
  SetContainerHeight: '[CalculationContext] Set Container Height',
  SetContainerWidth: '[CalculationContext] Set Container Width'
}

export const setContainerHeight = createAction(
  solutionActions.SetContainerHeight,
  props<{ height: number }>()
);

export const SetContainerWidth = createAction(
  solutionActions.SetContainerWidth,
  props<{ width: number }>()
);
