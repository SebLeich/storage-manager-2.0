import { createReducer, on } from "@ngrx/store";
import { highlightSolutionNavItem, resetSolutionNavItem } from "../actions/application.actions";

export const featureKey = 'application';

export interface State {
    solutionNavItemHighlighted: boolean
}

export const applicationState: State = {
    solutionNavItemHighlighted: false
}

export const reducer = createReducer(
    applicationState,
    on(highlightSolutionNavItem, (state) => ({ ...state, solutionNavItemHighlighted: true })),
    on(resetSolutionNavItem, (state) => ({ ...state, solutionNavItemHighlighted: false })),
);