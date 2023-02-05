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