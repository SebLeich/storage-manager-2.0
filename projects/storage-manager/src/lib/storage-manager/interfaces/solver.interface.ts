import { IGroup } from "./group.interface";
import { IOrder } from "./order.interface";
import { ISolution } from "./solution.interface";

export interface ISolver {
    solve(containerHeight: number, containerWidth: number, groups: IGroup[], orders: IOrder[]): ISolution;
}