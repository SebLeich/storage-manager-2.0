import { createReducer, on, Store } from '@ngrx/store';

import { InjectionToken } from '@angular/core';
import {
  setContainerHeight,
  setContainerWidth,
  setUnit,
} from '../actions/i-calculation-context.actions';

export const calculationContextFeatureKey = 'calculationContext';

export const CALCULATION_CONTEXT_REDUCER_TOKEN = new InjectionToken<Store<State>>(
  'Calculation Context Reducers'
);

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

export const calculationContextReducer = createReducer(
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
);
