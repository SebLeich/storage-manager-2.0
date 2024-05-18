import { IGroup } from "./group.interface";
import { IOrder } from "./order.interface";
import { IProduct } from "./product.interface";
import { ISolution } from "./solution.interface";

/**
 * @deprecated
 */
export interface ISolutionWrapper {
    solution: ISolution;
    groups: IGroup[];
    products: IProduct[];
    orders: IOrder[];
}