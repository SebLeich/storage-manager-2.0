import { IPositionedElement } from "./positioned.interface";
import { ISpace } from "./space.interface";

/**
 * @deprecated
 * please use spatial positioned type
 */
export interface IDimension extends IPositionedElement, ISpace {
    rCoord: number;
    tCoord: number;
    fCoord: number;
    points: IPositionedElement[];
}