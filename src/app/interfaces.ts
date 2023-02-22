import { IGroup } from "src/lib/storage-manager-store/interfaces/group.interface";
import { IOrder } from "src/lib/storage-manager-store/interfaces/order.interface";
import { ISolution } from "../lib/storage-manager-store/interfaces/solution.interface";

export interface ISolver {
    solve(containerHeight: number, containerWidth: number, groups: IGroup[], orders: IOrder[]): ISolution;
}
