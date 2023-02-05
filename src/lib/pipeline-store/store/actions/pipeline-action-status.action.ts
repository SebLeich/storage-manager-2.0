import { createAction } from "@ngrx/store";
import { PipelineActionStatus } from "../../types/pipeline-action-status.type";

export const updateIPipelineActionStatus = createAction(
    '[IPipeline] Update IPipelineActionStatus',
    (pipelineName: string, pipelineActionStatus: PipelineActionStatus) => ({ pipelineName, pipelineActionStatus })
);
