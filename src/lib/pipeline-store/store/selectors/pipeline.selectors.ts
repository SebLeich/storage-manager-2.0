import { createSelector } from "@ngrx/store";
import IPipeline from "../../interfaces/pipeline.interface";
import { featureKey, State } from "../reducers/pipeline.reducer";

export const pipelinesState = (state: any) => state[featureKey] as State;

export const selectPipelines = createSelector(pipelinesState, (state: State) => Object.values(state.entities).filter(pipeline => !!pipeline) as IPipeline[]);

export const selectPipelineByBpmnJsModel = (bpmnJsModel: string | null | undefined) => createSelector(
  pipelinesState,
  (state: State) => {
    const pipeline = Object.values(state.entities ?? {}).find(pipeline => pipeline?.bpmnJsModelReference === bpmnJsModel);
    return pipeline ?? null;
  }
);

export const selectPipelineById = (pipelineId: string | null) => createSelector(
  pipelinesState,
  (state: State) => {
    const pipeline = Object.values(state.entities ?? {}).find((pipeline) => pipeline?.id === pipelineId);
    return pipeline ?? null;
  }
);

export const selectSelectedPipeline = createSelector(pipelinesState, (state: State) => state.lastSelectedPipeline ?? null);