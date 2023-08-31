import { ICalculationAttributes, IGroup, IOrder, IProduct } from "@smgr/interfaces";

export interface ICalculationAttributesVariables extends ICalculationAttributes {
    groups: IGroup[];
    orders: IOrder[];
    products: IProduct[];
}