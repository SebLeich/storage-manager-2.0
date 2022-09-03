import { IEntity } from "./i-entity.interface";

export interface IOrder extends IEntity {
    id: string;
    description: string;
    quantity: number;
    length: number;
    width: number;
    height: number;
    turningAllowed: boolean;
    stackingAllowed: boolean;
    group: number;
}