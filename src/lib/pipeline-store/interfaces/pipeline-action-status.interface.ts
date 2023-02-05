import { PipelineActionStatus } from "../types/pipeline-action-status.type";

export interface IPipelineActionStatusInformation {
    pipelineAction: string;
    status: PipelineActionStatus;
    statusTimestamp: string;
}