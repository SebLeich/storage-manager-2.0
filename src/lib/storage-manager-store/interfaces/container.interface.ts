import { Unit } from "../../../app/types/unit.type";
import { IEntity } from "../../../app/interfaces/i-entity.interface";
import { IGood } from "./good.interface";
import { IPositionedElement } from "../../../app/interfaces/i-positioned.interface";
import { ISpace } from "../../../app/interfaces/i-space.interface";

export interface IContainer extends IPositionedElement, ISpace, IEntity {
    unit: Unit;
    goods: IGood[];
}