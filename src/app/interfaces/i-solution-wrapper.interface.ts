import { IGroup } from "./i-group.interface";
import { IOrder } from "./i-order.interface";
import { IProduct } from "./i-product.interface";
import { ISolution } from "./i-solution.interface";

export interface ISolutionWrapper {
    solution: ISolution;
    groups: IGroup[];
    products: IProduct[];
    orders: IOrder[];
}