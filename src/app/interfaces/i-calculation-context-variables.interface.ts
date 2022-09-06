import { IGroup } from "./i-group.interface";
import { IOrder } from "./i-order.interface";
import { IProduct } from "./i-product.interface";

export interface ICalculationAttributesVariables {
    containerWidth: number;
    containerHeight: number;
    unit: 'mm' | 'cm' | 'dm' | 'm';
    groups: IGroup[];
    orders: IOrder[];
    products: IProduct[];
}