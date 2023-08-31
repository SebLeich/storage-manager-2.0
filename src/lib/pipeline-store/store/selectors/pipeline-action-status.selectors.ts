import { createSelector } from "@ngrx/store";
import { IPipelineActionStatusInformation } from "../../interfaces/pipeline-action-status.interface";
import { featureKey, State } from "../reducers/pipeline-action-status.reducer";

export const pipelineActionState = (state: any) => state[featureKey] as State;

export const selectPipelineActionStatus = (pipelineAction: string | undefined | null) => createSelector(
  pipelineActionState,
  (state: State) => {
    if(!pipelineAction){
      return null;
    }
    const pipelineActionStatus = Object.values(state.entities ?? {}).find(pipelineActionStatus => pipelineActionStatus!.pipelineAction === pipelineAction);
    return pipelineActionStatus ?? null;
  }
);

export const selectPipelineActionStates = (pipelineActions: string[] | null | undefined) => createSelector(
  pipelineActionState,
  (state: State) => {
    if(!pipelineActions){
      return [];
    }
    const pipelineActionStates = Object.values(state.entities ?? {})
      .filter(pipelineActionStatus => pipelineActions.indexOf(pipelineActionStatus!.pipelineAction) > -1)
      .filter(pipelineActionStatus => pipelineActionStatus);

    return pipelineActionStates as IPipelineActionStatusInformation[];
  }
);