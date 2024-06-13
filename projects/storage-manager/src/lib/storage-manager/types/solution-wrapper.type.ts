import { IProduct } from "../interfaces";
import { CalculationStep } from "./calculation-step.type";
import { Group } from "./group.type";
import { Order } from "./order.type";
import { Solution } from "./solution.type";

export type SolutionWrapper = {
    solution: Solution;
    groups: Group[];
    products: IProduct[];
    orders: Order[];
    calculationSteps: CalculationStep[];
}