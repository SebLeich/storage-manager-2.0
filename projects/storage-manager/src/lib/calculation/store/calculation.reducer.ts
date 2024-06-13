import { createReducer, on } from "@ngrx/store";
import { setContainerDimensions, setSolutionWrappers } from "./calculation.actions";
import { SolutionWrapper } from "@/lib/storage-manager/types/solution-wrapper.type";

export const featureKey = 'CALCULATION';

export interface State {
    containerHeight: number;
    containerWidth: number;
    solutionWrappers: SolutionWrapper[];
}

const initialState: State = {
    containerHeight: 1000,
    containerWidth: 1000,
    solutionWrappers: []
};

export const reducer = createReducer(
    initialState,

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