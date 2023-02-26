import { IIdentifiable } from "src/lib/storage-manager-store/interfaces/identifiable.interface";

export interface IGroup extends IIdentifiable {
    color: string | null;
    desc: string | null;
    sequenceNumber: number;
}