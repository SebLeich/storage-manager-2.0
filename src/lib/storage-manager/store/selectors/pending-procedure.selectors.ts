import { createSelector } from "@ngrx/store";
import { featureKey, State } from "../reducers/pending-procedure.reducers";

export const pendingProcedureState = (state: any) => state[featureKey] as State;

export const selectAllProcedures = createSelector(
    pendingProcedureState,
    (state: State) => Object.values(state.entities)
);

export const selectHasDeterminingProcedures = createSelector(
    pendingProcedureState,
    (state: State) => typeof state?.globalProgress === 'number'
);

export const selectGlobalProcedureProgress = createSelector(
    pendingProcedureState,
    (state: State) => state?.globalProgress
);

export const selectPendingProcedures = createSelector(
    pendingProcedureState,
    (state: State) => {
        const pending = Object.values(state.entities).filter(pendingTask => (pendingTask!.progress === false) || (typeof pendingTask!.progress === 'number' && pendingTask!.progress < 100));
        return pending;
    }
);

export const selectHasPendingProcedures = createSelector(
    pendingProcedureState,
    (state: State) => {
        const pending = Object.values(state.entities).filter(pendingTask => (pendingTask!.progress === false) || (typeof pendingTask!.progress === 'number' && pendingTask!.progress < 100));
        return pending.length > 0;
    }
);

export const selectMostRecentlyFinishedProcedure = createSelector(
    pendingProcedureState,
    (state: State) => {
        const pendingTasks = Object
            .values(state.entities)
            .filter(pendingTask => {
                return (pendingTask!.progress === true)
                    || (typeof pendingTask!.progress === 'number' && pendingTask!.progress === 100);
            });

        const mostRecentlyFinished = pendingTasks.sort((a, b) => (a!.finishedUnix ?? 0) < (b!.finishedUnix ?? 0) ? 1 : -1)[0];

        return mostRecentlyFinished;
    }
);
