import { IIdentifiable } from "./identifiable.interface";
import { ISpace } from "./space.interface";

/**
 * @deprecated
 */
export interface IOrder extends ISpace, IIdentifiable {
    index: number;
    description: string | null;
    quantity: number;
    turningAllowed: boolean;
    stackingAllowed: boolean;
    group: string;
}