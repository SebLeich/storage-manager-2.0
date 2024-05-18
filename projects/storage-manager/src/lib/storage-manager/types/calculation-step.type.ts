import { UnusedPosition } from "./unused-position.type";
import { UsedPosition } from "./used-position.type";

export type CalculationStep = {
    sequenceNumber: number;
    messages: string[];
    createdPositions: UnusedPosition[];
    usedPosition: UsedPosition;
}