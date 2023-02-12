import { createAction } from "@ngrx/store";
import { IPipelineAction } from "../../interfaces/pipeline-action.interface";
import { PipelineActionStatus } from "../../types/pipeline-action-status.type";

export const updateIPipelineActionStatus = createAction(
    '[IPipeline] Update IPipelineActionStatus',
    (pipelineName: string, pipelineActionStatus: PipelineActionStatus) => ({ pipelineName, pipelineActionStatus })
);

export const updateIPipelineActionStatuses = createAction(
    '[IPipeline] Update IPipelineActionStatuses',
    (pipelineActions: IPipelineAction[], pipelineActionStatus: PipelineActionStatus) => ({ pipelineActions, pipelineActionStatus })
);