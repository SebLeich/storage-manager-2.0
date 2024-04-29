import { Unit } from "../../../app/types/unit.type";
import { IIdentifiable } from "./identifiable.interface";
import { IGood } from "./good.interface";
import { IPositionedElement } from "./positioned.interface";
import { ISpace } from "./space.interface";

export interface IContainer extends IPositionedElement, ISpace, IIdentifiable {
    unit: Unit;
    goods: IGood[];
}