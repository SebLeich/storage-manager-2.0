import { IDimension } from "../../lib/storage-manager/interfaces/dimension.interface";

export interface IVirtualDimension extends IDimension {
    stackedOn?: number;
    groupRestrictedBy?: number;
}