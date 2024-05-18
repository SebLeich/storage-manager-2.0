import { IDimension } from "./dimension.interface";

/**
 * @deprecated
 */
export interface IVirtualDimension extends IDimension {
    stackedOn?: number;
    groupRestrictedBy?: number;
}