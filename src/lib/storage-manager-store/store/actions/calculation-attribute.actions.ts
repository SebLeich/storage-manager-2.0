import { createAction, props } from '@ngrx/store';
import { ICalculationAttributesVariables } from 'src/app/interfaces/i-calculation-context-variables.interface';

export const solutionActions = {
  SetContainerHeight: '[CalculationAttributes] Set Container Height',
  SetContainerWidth: '[CalculationAttributes] Set Container Width',
  SetExemplaryInputData: '[CalculationAttributes] Set Exemplary Input Data',
  SetUnit: '[CalculationAttributes] Set Unit',
  UpdateCalculationAttributes: '[CalculationAttributes] Update Calculation Context',
}

export const setContainerHeight = createAction(
  solutionActions.SetContainerHeight,
  props<{ height: number }>()
);

export const setContainerWidth = createAction(
  solutionActions.SetContainerWidth,
  props<{ width: number }>()
);

export const setExemplaryInputData = createAction(
  solutionActions.SetExemplaryInputData
);

export const setUnit = createAction(
  solutionActions.SetUnit,
  props<{ unit: 'mm' | 'cm' | 'dm' | 'm' }>()
);

export const updateCalculationAttributes = createAction(
  solutionActions.SetUnit,
  props<ICalculationAttributesVariables>()
);
