import { IIdentifiable } from "./identifiable.interface";
import { ISpace } from "./space.interface";

/**
 * @deprecated
 */
export interface IProduct extends IIdentifiable, ISpace {
    id: string;
    description: string | null;
}