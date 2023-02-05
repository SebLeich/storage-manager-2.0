import { IGroup } from "./group.interface";
import { IOrder } from "./order.interface";
import { IProduct } from "../../../app/interfaces/i-product.interface";
import { ISolution } from "./solution.interface";

export interface ISolutionWrapper {
    solution: ISolution;
    groups: IGroup[];
    products: IProduct[];
    orders: IOrder[];
}