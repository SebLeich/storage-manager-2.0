import { UnusedPosition } from "./unused-position.type";

export type UsedPosition = UnusedPosition & {
    goodId: number;
    goodDesc: string;
    groupId: string;
    usedPositions: number[];
}