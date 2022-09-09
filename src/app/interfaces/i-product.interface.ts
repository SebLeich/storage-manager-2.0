import { IEntity } from "./i-entity.interface";

export interface IProduct extends IEntity {
    id: string;
    description: string | null;
    height: number;
    length: number;
    width: number;
}