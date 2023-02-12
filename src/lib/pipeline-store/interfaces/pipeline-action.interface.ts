import { ISolutionWrapper } from "src/lib/storage-manager-store/interfaces/solution-wrapper.interface";

export interface IPipelineAction {
    identifier: string;
    pipeline: string;
    name: string;
    executableCode: any;
    onSuccess: string;
    onError?: string;
    isProvidingPipelineOutput: boolean;
    outputMatchesPipelineOutput: boolean;
    isPipelineStart: boolean;
    ouputParamName?: string;
    bpmnElementIdentifier: string;
    solutionReference: ISolutionWrapper | null;
}