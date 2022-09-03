import { IEntity } from "./i-entity.interface";
import { IPositionedElement } from "./i-positioned.interface";
import { ISpace } from "./i-space.interface";

export interface IDimension extends IEntity, IPositionedElement, ISpace {
    rCoord: number;
    tCoord: number;
    fCoord: number;
    points: IPositionedElement[];
}