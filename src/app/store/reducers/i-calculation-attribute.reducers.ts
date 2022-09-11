import { createReducer, on } from '@ngrx/store';

import {
  setContainerHeight,
  setContainerWidth,
  setUnit,
  updateCalculationAttributes,
} from '../actions/i-calculation-attribute.actions';

export const calculationAttributesFeatureKey = 'calculationAttributes';

export interface State {
  containerHeight: number;
  containerWidth: number;
  unit: 'mm' | 'cm' | 'dm' | 'm';
}

export const initialState: State = {
  containerHeight: 1000,
  containerWidth: 1000,
  unit: 'mm'
}

export const calculationAttributesReducer = createReducer(
  initialState,
  on(setContainerHeight, (state, { height }) => {
    return { ...state, containerHeight: height };
  }),
  on(setContainerWidth, (state, { width }) => {
    return { ...state, containerWidth: width };
  }),
  on(setUnit, (state, { unit }) => {
    return { ...state, unit: unit };
  }),
  on(updateCalculationAttributes, (_, variables) => {
    return {
      containerHeight: variables.containerHeight,
      containerWidth: variables.containerWidth,
      unit: variables.unit
    };
  })
);
