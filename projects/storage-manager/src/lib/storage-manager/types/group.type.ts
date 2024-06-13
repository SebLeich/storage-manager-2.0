import { Identifiable } from "./identifiable.type";

export type Group = Identifiable & {
    color: string | null;
    desc: string | null;
    sequenceNumber: number;
}