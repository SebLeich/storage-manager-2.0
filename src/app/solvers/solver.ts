import { Order, Space } from "../classes";

export class Solver {

    protected canPlaceOrderIntoSpace(order: Order, space: Space): { notTurned: boolean, turned: boolean } {
        return {
            notTurned: space.width >= order.width && space.length >= order.length && space.height >= order.height,
            turned: space.width >= order.length && space.length >= order.width && space.height >= order.height,
        };
    }

}