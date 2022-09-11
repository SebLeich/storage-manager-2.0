import { IPositionedElement } from "./i-positioned.interface";
import { ISpace } from "./i-space.interface";

export interface IPosition extends ISpace, IPositionedElement {
    id: string;
    rotated: boolean;
    index: number;
    fCoord: number;
    rCoord: number;
    tCoord: number;
    groupRestrictedBy: number | null;
}