import { IEntity } from "./i-entity.interface";
import { ISpace } from "./i-space.interface";

export interface IOrder extends ISpace, IEntity {
    id: string;
    description: string | null;
    quantity?: number;
    length: number;
    width: number;
    height: number;
    turningAllowed: boolean;
    stackingAllowed: boolean;
    group?: string;
}