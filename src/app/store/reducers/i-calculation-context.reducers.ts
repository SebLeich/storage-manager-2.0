import { createReducer, on, Store } from '@ngrx/store';

import { InjectionToken } from '@angular/core';
import {
  setContainerHeight,
  SetContainerWidth,
} from '../actions/i-calculation-context.actions';

export const calculationContextFeatureKey = 'calculationContext';

export const CALCULATION_CONTEXT_REDUCER_TOKEN = new InjectionToken<Store<State>>(
  'Calculation Context Reducers'
);

export interface State {
  containerHeight: number;
  containerWidth: number;
}

export const initialState: State = {
  containerHeight: 1000,
  containerWidth: 1000,
}

export const calculationContextReducer = createReducer(
  initialState,
  on(setContainerHeight, (state, { height }) => {
    state.containerHeight = height;
    return state;
  }),
  on(SetContainerWidth, (state, { width }) => {
    state.containerWidth = width;
    return state;
  }),
);
