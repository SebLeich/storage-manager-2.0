import { createReducer, on } from "@ngrx/store";
import { setSolution, setSolutionValidation } from "./visualization.actions";
import { SolutionWrapper } from "@/lib/storage-manager/types/solution-wrapper.type";
import { SolutionValidationErrorWrapper } from "@/lib/shared/types/solution-validation-error-wrapper.type";

export const FEATURE_KEY = 'VISUALIZATION';

export interface State {
    solutionWrapper: SolutionWrapper | null;
    validation: SolutionValidationErrorWrapper[];
}

export const INITIAL_STATE: State = {
    solutionWrapper: null,
    validation: []
}

export const REDUCER = createReducer(
    INITIAL_STATE,
    on(setSolution, (state, { solutionWrapper }) => ({ ...state, solutionWrapper })),
    on(setSolutionValidation, (state, { validation }) => ({ ...state, validation }))
);