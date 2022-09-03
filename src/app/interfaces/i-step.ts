import { Dimension, UnusedDimension } from "../classes";

export interface IStep {
    sequenceNumber: number;
    messages: string[];
    unusedDimensions: UnusedDimension[];
    dimension: Dimension | null;
    usedDimension: UnusedDimension | null;
}