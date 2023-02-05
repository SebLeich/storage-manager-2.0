import { IEntity } from "../../../app/interfaces/i-entity.interface";
import { IPositionedElement } from "../../../app/interfaces/i-positioned.interface";
import { ISpace } from "../../../app/interfaces/i-space.interface";

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