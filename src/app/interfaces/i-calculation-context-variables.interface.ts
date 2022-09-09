import { ICalculationAttributes } from "./i-calculation-context.interface";
import { IGroup } from "./i-group.interface";
import { IOrder } from "./i-order.interface";
import { IProduct } from "./i-product.interface";

export interface ICalculationAttributesVariables extends ICalculationAttributes {
    groups: IGroup[];
    orders: IOrder[];
    products: IProduct[];
}