import { createAction, props } from '@ngrx/store';

export const solutionActions = {
  SetContainerHeight: '[CalculationContext] Set Container Height',
  SetContainerWidth: '[CalculationContext] Set Container Width',
  SetUnit: '[CalculationContext] Set Unit'
}

export const setContainerHeight = createAction(
  solutionActions.SetContainerHeight,
  props<{ height: number }>()
);

export const setContainerWidth = createAction(
  solutionActions.SetContainerWidth,
  props<{ width: number }>()
);

export const setUnit = createAction(
  solutionActions.SetContainerWidth,
  props<{ unit: 'mm' | 'cm' | 'dm' | 'm' }>()
);
