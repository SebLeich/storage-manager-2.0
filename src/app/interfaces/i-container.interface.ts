import { Unit } from "../types/unit.type";
import { IEntity } from "./i-entity.interface";
import { IGood } from "./i-good.interface";
import { IPositionedElement } from "./i-positioned.interface";
import { ISpace } from "./i-space.interface";

export interface IContainer extends IPositionedElement, ISpace, IEntity {
    unit: Unit;
    goods: IGood[];
}