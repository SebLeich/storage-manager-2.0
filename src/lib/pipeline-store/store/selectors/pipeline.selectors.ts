import { createSelector } from "@ngrx/store";
import { featureKey, State } from "../reducers/pipeline.reducer";

export const pipelinesState = (state: any) => state[featureKey] as State;

export const selectPipelineByBpmnJsModel = (bpmnJsModel: string | null | undefined) => createSelector(
  pipelinesState,
  (state: State) => {
    const pipeline = Object.values(state.entities ?? {}).find(pipeline => pipeline?.bpmnJsModelReference === bpmnJsModel);
    return pipeline ?? null;
  }
);

export const selectPipelineByName = (pipelineName: string) => createSelector(
  pipelinesState,
  (state: State) => {
    const pipeline = Object.values(state.entities ?? {}).find(pipeline => pipeline?.name === pipelineName);
    return pipeline ?? null;
  }
);