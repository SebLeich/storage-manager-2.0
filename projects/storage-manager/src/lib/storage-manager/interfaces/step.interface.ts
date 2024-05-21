import { IPosition } from "./position.interface";

/**
 * @deprecated
 */
export interface IStep {
    sequenceNumber?: number;
    messages?: string[];
    createdPositions: IPosition[];
    placedAtPosition?: IPosition;
    usedPosition?: IPosition;
}