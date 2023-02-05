import { PipelineActionStatus } from "../types/pipeline-action-status.type";

export interface IPipelineActionStatusInformation {
    pipeline: string;
    pipelineAction: string;
    status: PipelineActionStatus;
    statusTimestamp: string;
}