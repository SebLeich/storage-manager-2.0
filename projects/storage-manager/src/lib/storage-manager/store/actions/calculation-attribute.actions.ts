import { createAction, props } from '@ngrx/store';
import { ICalculationAttributesVariables } from 'src/app/interfaces/i-calculation-context-variables.interface';

export const calculationAttributeActions = {
  SetContainerHeight: '[CalculationAttributes] Set Container Height',
  SetContainerWidth: '[CalculationAttributes] Set Container Width',
  SetExemplaryInputData: '[CalculationAttributes] Set Exemplary Input Data',
  SetUnit: '[CalculationAttributes] Set Unit',
  UpdateCalculationAttributes: '[CalculationAttributes] Update Calculation Context',
}

export const setContainerHeight = createAction(
  calculationAttributeActions.SetContainerHeight,
  props<{ height: number }>()
);

export const setContainerWidth = createAction(
  calculationAttributeActions.SetContainerWidth,
  props<{ width: number }>()
);

export const setExemplaryInputData = createAction(
  calculationAttributeActions.SetExemplaryInputData
);

export const setUnit = createAction(
  calculationAttributeActions.SetUnit,
  props<{ unit: 'mm' | 'cm' | 'dm' | 'm' }>()
);

export const updateCalculationAttributes = createAction(
  calculationAttributeActions.SetUnit,
  props<ICalculationAttributesVariables>()
);
