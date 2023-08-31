import { IIdentifiable } from "./identifiable.interface";

export interface IGroup extends IIdentifiable {
    color: string | null;
    desc: string | null;
    sequenceNumber: number;
}