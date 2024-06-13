import { createReducer, on } from "@ngrx/store";
import { setContainerDimensions, setSolutionWrappers } from "./calculation.actions";
import { SolutionWrapper } from "@/lib/storage-manager/types/solution-wrapper.type";

export const FEATURE_KEY = 'CALCULATION';

export interface State {
    containerHeight: number;
    containerWidth: number;
    solutionWrappers: SolutionWrapper[];
}

export const INITIAL_STATE: State = {
    containerHeight: 1000,
    containerWidth: 1000,
    solutionWrappers: []
};

export const REDUCER = createReducer(
    INITIAL_STATE,

    on(setContainerDimensions, (state, { containerHeight, containerWidth }) => ({
        ...state,
        containerHeight: containerHeight || state.containerHeight,
        containerWidth: containerWidth || state.containerWidth
    })),

    on(setSolutionWrappers, (state, { solutionWrappers }) => ({
        ...state,
        solutionWrappers
    }))
);