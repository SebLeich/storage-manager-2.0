import { IEntity } from "../../../app/interfaces/i-entity.interface";
import { ISpace } from "../../../app/interfaces/space.interface";

export interface IOrder extends ISpace, IEntity {
    id: string;
    index: number;
    description: string | null;
    quantity: number;
    length: number;
    width: number;
    height: number;
    turningAllowed: boolean;
    stackingAllowed: boolean;
    group: string;
}