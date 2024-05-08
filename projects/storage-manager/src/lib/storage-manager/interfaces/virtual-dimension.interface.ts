import { IDimension } from "./dimension.interface";

export interface IVirtualDimension extends IDimension {
    stackedOn?: number;
    groupRestrictedBy?: number;
}