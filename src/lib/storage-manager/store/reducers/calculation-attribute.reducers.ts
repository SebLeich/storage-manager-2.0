import { createReducer, on } from '@ngrx/store';
import {
  setContainerHeight,
  setContainerWidth,
  setUnit,
  updateCalculationAttributes,
} from '../actions/calculation-attribute.actions';
import exampleSolution from 'src/config/example-solution';
import { setExemplarySolution } from '../actions/solution.actions';
import { Unit } from 'src/app/types/unit.type';

export const calculationAttributesFeatureKey = 'calculationAttributes';

export interface State {
  containerHeight: number;
  containerWidth: number;
  unit: Unit;
}

export const initialState: State = {
  containerHeight: 1000,
  containerWidth: 1000,
  unit: 'mm' as Unit
}

export const reducer = createReducer(
  initialState,
  on(setContainerHeight, (state, { height }) => {
    return { ...state, containerHeight: height };
  }),
  on(setContainerWidth, (state, { width }) => {
    return { ...state, containerWidth: width };
  }),
  on(setExemplarySolution, () => {
    return {
      containerHeight: exampleSolution.container.height,
      containerWidth: exampleSolution.container.width,
      unit: exampleSolution.container.unit as Unit
    };
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
