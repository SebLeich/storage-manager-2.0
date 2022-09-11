import { SolutionPreviewStatus } from "../enumerations/solution-preview-status.enumeration";

export interface ISolutionPreview {
    solutionId: string;
    status: SolutionPreviewStatus;
    dataURL?: string;
}