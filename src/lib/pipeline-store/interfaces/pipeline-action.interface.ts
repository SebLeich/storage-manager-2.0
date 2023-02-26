import { ISolutionWrapper } from "@smgr/interfaces";

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