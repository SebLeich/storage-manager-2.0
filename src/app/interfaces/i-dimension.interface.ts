import { IEntity } from "./i-entity.interface";
import { IPositionedElement } from "./positioned.interface";
import { ISpace } from "./space.interface";

export interface IDimension extends IEntity, IPositionedElement, ISpace {
    rCoord: number;
    tCoord: number;
    fCoord: number;
    points: IPositionedElement[];
}