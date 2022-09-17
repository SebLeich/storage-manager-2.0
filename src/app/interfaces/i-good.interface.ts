import { IEntity } from "./i-entity.interface";
import { IPositionedElement } from "./i-positioned.interface";
import { ISpace } from "./i-space.interface";

export interface IGood extends IPositionedElement, ISpace, IEntity {
    desc: string | null;
    group: string;
    turningAllowed: boolean;
    turned: boolean;
    stackingAllowed: boolean;
    stackedOnGood: string | null;
    sequenceNr: number;
    orderGuid: string;
}