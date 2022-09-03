import { IDimension } from "./i-dimension.interface";

export interface IVirtualDimension extends IDimension {
    stackedOn?: number;
    groupRestrictedBy?: number;
}