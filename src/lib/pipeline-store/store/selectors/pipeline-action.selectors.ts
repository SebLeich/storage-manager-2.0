import { createSelector } from "@ngrx/store";
import { featureKey, State } from "../reducers/pipeline-action.reducer";

export const pipelineActionState = (state: any) => state[featureKey] as State;

export const selectPipelineAction = (pipelineActionIdentifier: string) => createSelector(
  pipelineActionState,
  (state: State) => {
    const pipelineAction = Object.values(state.entities ?? {}).find(pipelineAction => pipelineAction!.identifier === pipelineActionIdentifier);
    return pipelineAction ?? null;
  }
);

export const selectPipelineActionByPipelineName = (pipelineName: string) => createSelector(
  pipelineActionState,
  (state: State) => {
    const pipelineAction = Object.values(state.entities ?? {}).filter(pipelineAction => pipelineAction!.pipeline === pipelineName);
    return pipelineAction ?? null;
  }
);