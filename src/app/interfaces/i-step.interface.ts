import { IDimension } from "./i-dimension.interface";
import { IVirtualDimension } from "./i-virtual-dimension.interface";

export interface IStep {
    sequenceNumber?: number;
    messages?: string[];
    unusedDimensions?: IVirtualDimension[];
    dimension?: IDimension;
    usedDimension?: IVirtualDimension;
}