import { ICalculationAttributes } from "./i-calculation-context.interface";
import { IGroup } from "../../lib/storage-manager-store/interfaces/group.interface";
import { IOrder } from "../../lib/storage-manager-store/interfaces/order.interface";
import { IProduct } from "../../lib/storage-manager-store/interfaces/product.interface";

export interface ICalculationAttributesVariables extends ICalculationAttributes {
    groups: IGroup[];
    orders: IOrder[];
    products: IProduct[];
}