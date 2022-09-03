import { IEntity } from "./i-entity.interface";
import { IPositionedElement } from "./i-positioned.interface";
import { ISpace } from "./i-space.interface";

export interface IGood extends IPositionedElement, ISpace, IEntity {
    desc?: string;
    group: number;
    turningAllowed: boolean;
    turned: boolean;
    stackingAllowed: boolean;
    stackedOnGood?: number;
    sequenceNr?: number;
}