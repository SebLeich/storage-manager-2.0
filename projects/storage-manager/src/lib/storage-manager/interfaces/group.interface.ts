import { IIdentifiable } from "./identifiable.interface";

/**
 * @deprecated
 */
export interface IGroup extends IIdentifiable {
    color: string | null;
    desc: string | null;
    sequenceNumber: number;
}