import { createAction } from "@ngrx/store";
import IPipeline from "src/lib/pipeline-store/interfaces/pipeline.interface";

export const addPipeline = createAction(
    '[Pipeline] Add Pipeline',
    (pipeline: IPipeline) => ({ pipeline })
);

export const removePipeline = createAction(
    '[Pipeline] Remove Pipeline',
    (pipeline: IPipeline) => ({ pipeline })
);

export const removePipelineById = createAction(
    '[Pipeline] Remove Pipeline By Id',
    (pipelineIdentifier: string) => ({ pipelineIdentifier })
);

export const setSelectedPipeline = createAction(
    '[Pipeline] Select Pipeline',
    (pipelineId: string) => ({ pipelineId })
);

export const setPipelineSolutionReference = createAction(
    '[Pipeline] Set Pipeline Solution Reference',
    (pipelineId: string, solutionIdentifier: string) => ({ pipelineId, solutionIdentifier })
);

export const renamePipeline = createAction(
    '[Pipeline] Rename Pipeline',
    (pipeline: IPipeline, updatedName: string) => ({ pipeline, updatedName })
);

export const renamePipelineById = createAction(
    '[Pipeline] Rename Pipeline By Id',
    (pipelineIdentifier: string, updatedName: string) => ({ pipelineIdentifier, updatedName })
);
