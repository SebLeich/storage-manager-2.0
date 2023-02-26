import { IIdentifiable } from "./identifiable.interface";
import { ISpace } from "./space.interface";

export interface IProduct extends IIdentifiable, ISpace {
    id: string;
    description: string | null;
}