import { UnusedPosition } from "./unused-position.type";

export type UsedPosition = UnusedPosition & {
    goodId: string;
    goodDesc: string;
    groupId: string;
    usedPositions: number[];
}