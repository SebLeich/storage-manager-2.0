import { createReducer, on } from "@ngrx/store";
import { setSolution, setSolutionValidation, updateGroup } from "./visualization.actions";
import { SolutionWrapper } from "@/lib/storage-manager/types/solution-wrapper.type";
import { SolutionValidationErrorWrapper } from "@/lib/shared/types/solution-validation-error-wrapper.type";
import { solutionWrapper } from "../constants/solution-wrapper.const";

export const FEATURE_KEY = 'VISUALIZATION';

export interface State {
    solutionWrapper: SolutionWrapper | null;
    validation: SolutionValidationErrorWrapper[];
}

export const INITIAL_STATE: State = {
    solutionWrapper: solutionWrapper as any,
    validation: []
}

export const REDUCER = createReducer(
    INITIAL_STATE,
    on(setSolution, (state, { solutionWrapper }) => ({ ...state, solutionWrapper })),
    on(setSolutionValidation, (state, { validation }) => ({ ...state, validation })),
    on(updateGroup, (state, { group }) => {
        const solutionWrapper = state.solutionWrapper;
        if (!solutionWrapper) {
            return state;
        }

        const groups = solutionWrapper.groups.map(currentGroup => currentGroup.id === group.id ? group : currentGroup);
        return { ...state, solutionWrapper: { ...solutionWrapper, groups } };
    })
);