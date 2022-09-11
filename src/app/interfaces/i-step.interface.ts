import { IPosition } from "./i-position.interface";

export interface IStep {
    sequenceNumber?: number;
    messages?: string[];
    createdPositions: IPosition[];
    placedAtPosition?: IPosition;
    usedPosition?: IPosition;
}