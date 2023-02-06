export interface IPipelineAction {
    identifier: string;
    pipeline: string;
    name: string;
    executableCode: any;
    onSuccess: string;
    onError?: string;
    isProvidingPipelineOutput: boolean;
    isPipelineStart: boolean;
    ouputParamName?: string;
}