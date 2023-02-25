import { Unit } from "../../../app/types/unit.type";
import { IEntity } from "../../../app/interfaces/i-entity.interface";
import { IGood } from "./good.interface";
import { IPositionedElement } from "../../../app/interfaces/positioned.interface";
import { ISpace } from "src/app/interfaces/space.interface";

export interface IContainer extends IPositionedElement, ISpace, IEntity {
    unit: Unit;
    goods: IGood[];
}