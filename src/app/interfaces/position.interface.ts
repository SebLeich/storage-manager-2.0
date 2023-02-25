import { IPositionedElement } from "./positioned.interface";
import { ISpace } from "./space.interface";

export interface IPosition extends ISpace, IPositionedElement {
    id: string;
    rotated: boolean;
    index: number;
    fCoord: number;
    rCoord: number;
    tCoord: number;
    groupRestrictedBy: number | null;
}