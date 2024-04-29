import { IIdentifiable } from "./identifiable.interface";
import { IPositionedElement } from "./positioned.interface";
import { ISpace } from "./space.interface";

export interface IDimension extends IIdentifiable, IPositionedElement, ISpace {
    rCoord: number;
    tCoord: number;
    fCoord: number;
    points: IPositionedElement[];
}