import { IEntity } from "./i-entity";

export interface IProduct extends IEntity {
    id: string;
    description: string;
    height: number;
    length: number;
    width: number;
}