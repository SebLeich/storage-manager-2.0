import { IPositionedElement } from "./positioned.interface";
import { IIdentifiable } from "./identifiable.interface";
import { ISpace } from "./space.interface";

/**
 * @deprecated
 */
export interface IPosition extends IIdentifiable, ISpace, IPositionedElement {
    rotated: boolean;
    index: number;
    fCoord: number;
    rCoord: number;
    tCoord: number;
    groupRestrictedBy: number | null;
}