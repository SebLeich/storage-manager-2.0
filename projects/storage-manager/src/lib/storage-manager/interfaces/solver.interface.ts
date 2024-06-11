import { SolutionWrapper } from "../types/solution-wrapper.type";
import { Order } from "../types/order.type";
import { Group } from "../types/group.type";

export interface ISolver {
    solve(containerHeight: number, containerWidth: number, groups: Group[], orders: Order[]): SolutionWrapper;
}