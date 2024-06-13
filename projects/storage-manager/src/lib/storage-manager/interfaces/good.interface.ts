import { IIdentifiable } from "./identifiable.interface";
import { IPositionedElement } from "./positioned.interface";
import { ISpace } from "./space.interface";

/**
 * @deprecated
 */
export interface IGood extends IPositionedElement, ISpace, IIdentifiable {
    desc: string | null;
    group: string;
    turningAllowed: boolean;
    turned: boolean;
    stackingAllowed: boolean;
    stackedOnGood: string | null;
    sequenceNr: number;
    orderGuid: string;
}