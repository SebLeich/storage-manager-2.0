import { createReducer, on } from "@ngrx/store";
import { setContainerDimensions } from "./calculation.actions";

export const featureKey = 'CALCULATION';

export interface State {
    containerHeight: number;
    containerWidth: number;
}

const initialState: State = {
    containerHeight: 1000,
    containerWidth: 1000
};

export const reducer = createReducer(
    initialState,
    
    on(setContainerDimensions, (state, { containerHeight, containerWidth }) => ({
        ...state,
        containerHeight: containerHeight || state.containerHeight,
        containerWidth: containerWidth || state.containerWidth
    }))
);