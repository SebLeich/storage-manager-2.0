export interface IPipelineAction {
    identifier: string;
    pipeline: string;
    name: string;
    executableCode: any;
    sequenceNumber: number;
    onSuccess: string;
    onError?: string;
    isProvidingSolutionWrapper: boolean;
}