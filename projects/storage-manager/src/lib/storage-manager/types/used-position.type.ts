import { UnusedPosition } from "./unused-position.type";

export type UsedPosition = UnusedPosition & {
    placedGood: number;
    usedPositions: number[];
}