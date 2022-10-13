import { createSelector } from "@ngrx/store";
import { pendingProcedureFeatureKey, State } from "../reducers/i-pending-procedure.reducers";

export const pendingProcedureState = (state: any) => state[pendingProcedureFeatureKey] as State;

export const selectCanProvideDeterminateProgress = createSelector(
    pendingProcedureState,
    (state: State) => typeof state?.globalProgress === 'number'
);

export const selectGlobalProcedureProgress = createSelector(
    pendingProcedureState,
    (state: State) => state?.globalProgress
);

export const selectHasPendingTasks = createSelector(
    pendingProcedureState,
    (state: State) => {
        const pendingTasks = Object.values(state.entities).filter(pendingTask => pendingTask!.progress! < 100);
        return pendingTasks.length > 0;
    }
);
