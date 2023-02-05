import { createSelector } from "@ngrx/store";
import { featureKey, State } from "../reducers/pipeline-action-status.reducer";

export const pipelineActionState = (state: any) => state[featureKey] as State;

export const selectPipelineActionStatus = (pipelineAction: string) => createSelector(
  pipelineActionState,
  (state: State) => {
    const pipelineActionStatus = Object.values(state.entities ?? {}).find(pipelineActionStatus => pipelineActionStatus!.pipelineAction === pipelineAction);
    return pipelineActionStatus ?? null;
  }
);

export const selectPipelineActionStates = (pipelineActions: string[]) => createSelector(
  pipelineActionState,
  (state: State) => {
    const pipelineActionStates = Object.values(state.entities ?? {})
      .filter(pipelineActionStatus => pipelineActions.indexOf(pipelineActionStatus!.pipelineAction) > -1)
      .filter(pipelineActionStatus => pipelineActionStatus);

    return pipelineActionStates;
  }
);