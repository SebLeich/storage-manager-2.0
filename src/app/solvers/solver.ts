import { UnusedDimension, Order, Space } from "../classes";
import { MinimizationFunction } from "../globals";

export class Solver {

    private _minimizationFunctions: { [key: number]: (space: UnusedDimension) => number } = { };

    constructor() {
        this._minimizationFunctions[MinimizationFunction.MIN_VOLUME] = (space: UnusedDimension) => space.height * space.length * space.width;
        this._minimizationFunctions[MinimizationFunction.MIN_X] = (space: UnusedDimension) => space.x;
        this._minimizationFunctions[MinimizationFunction.MIN_Y] = (space: UnusedDimension) => space.y;
        this._minimizationFunctions[MinimizationFunction.MIN_Z] = (space: UnusedDimension) => space.z;
    }

    protected canPlaceOrderIntoSpace(order: Order, space: Space): { notTurned: boolean, turned: boolean } {
        return {
            notTurned: space.width >= order.width && space.length >= order.length && space.height >= order.height,
            turned: space.width >= order.length && space.length >= order.width && space.height >= order.height,
        };
    }

    protected getBestUnusedDimensionsForMinimizationFunction(unusedDimensions: UnusedDimension[], minimizationFunction: MinimizationFunction) {
        if (unusedDimensions.length === 0) return null;
        if (unusedDimensions.length === 1) return unusedDimensions[0];
        return unusedDimensions.reduce((prev: UnusedDimension, curr: UnusedDimension) => {
            return this._minimizationFunctions[minimizationFunction](prev) < this._minimizationFunctions[minimizationFunction](curr) ? prev : curr;
        });
    }

    protected putOrderAndCreateUnusedDimensions(order: Order, unusedDimension: UnusedDimension): UnusedDimension[] {
        let unusedDimensions: UnusedDimension[] = [];
        if (order.height < unusedDimension.height) {
            let above = new UnusedDimension(order.width, unusedDimension.height - order.height, order.length);
            above.x = unusedDimension.x;
            above.y = unusedDimension.y + order.height;
            above.z = unusedDimension.z;
            unusedDimensions.push(above);
        }
        if(order.width < unusedDimension.width){
            let next = new UnusedDimension(unusedDimension.width - order.width, unusedDimension.height, order.length);
            next.x = unusedDimension.x + order.width;
            next.y = unusedDimension.y;
            next.z = unusedDimension.z;
            unusedDimensions.push(next);
        }
        if(order.length < unusedDimension.length){
            let infront = new UnusedDimension(unusedDimension.width, unusedDimension.height, unusedDimension.length - order.length);
            infront.x = unusedDimension.x;
            infront.y = unusedDimension.y;
            infront.z = unusedDimension.z + order.length;
            unusedDimensions.push(infront);
        }
        return unusedDimensions;
    }

}