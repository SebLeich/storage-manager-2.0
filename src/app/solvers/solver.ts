import { UnusedDimension, Order, Space } from "../classes";
import { MinimizationFunction } from "../globals";

export class Solver {

    private _minimizationFunctions: { [key: number]: (space: UnusedDimension) => number } = {};

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

    protected combineSpaces(unusedDimensions: UnusedDimension[]): UnusedDimension {
        let x = Math.min(...unusedDimensions.map(x => x.x));
        let y = Math.min(...unusedDimensions.map(x => x.y));
        let z = Math.min(...unusedDimensions.map(x => x.z));
        let r = Math.max(...unusedDimensions.map(x => x.r));
        let t = Math.max(...unusedDimensions.map(x => x.t));
        let f = Math.max(...unusedDimensions.map(x => x.f));
        let dimension = new UnusedDimension(r-x, t-y, f-z); // TODO
        dimension.setPosition(x, y, z);
        return dimension;
    }

    protected getBestUnusedDimensionsForMinimizationFunction(unusedDimensions: UnusedDimension[], minimizationFunction: MinimizationFunction) {
        if (unusedDimensions.length === 0) return null;
        if (unusedDimensions.length === 1) return unusedDimensions[0];
        return unusedDimensions.reduce((prev: UnusedDimension, curr: UnusedDimension) => {
            return this._minimizationFunctions[minimizationFunction](prev) < this._minimizationFunctions[minimizationFunction](curr) ? prev : curr;
        });
    }

    protected getCombinableSpacePairs(unusedDimensions: UnusedDimension[], returnFirstOnly: boolean = false): UnusedDimension[][] {
        let output = [];
        for (let unusedDimension of unusedDimensions) {
            let result = [unusedDimension, ...unusedDimensions.filter((x: UnusedDimension) => x === unusedDimension ? false : this._unusedDimensionsShare4Points(unusedDimension, x))];
            if (result.length > 1) {
                output.push(result);
                if(returnFirstOnly) break;
            }
        }
        return output;
    }

    protected putOrderAndCreateUnusedDimensions(order: Order, unusedDimension: UnusedDimension): UnusedDimension[] {
        let unusedDimensions: UnusedDimension[] = [];
        if (order.height < unusedDimension.height) {
            let above = new UnusedDimension(order.width, unusedDimension.height - order.height, order.length);
            above.setPosition(unusedDimension.x, unusedDimension.y + order.height, unusedDimension.z);
            unusedDimensions.push(above);
        }
        if (order.width < unusedDimension.width) {
            let next = new UnusedDimension(unusedDimension.width - order.width, unusedDimension.height, order.length);
            next.setPosition(unusedDimension.x + order.width, unusedDimension.y, unusedDimension.z);
            unusedDimensions.push(next);
        }
        if (order.length < unusedDimension.length) {
            let infront = new UnusedDimension(unusedDimension.width, unusedDimension.height, unusedDimension.length - order.length);
            infront.setPosition(unusedDimension.x, unusedDimension.y, unusedDimension.z + order.length);
            unusedDimensions.push(infront);
        }
        return unusedDimensions;
    }

    private _unusedDimensionsShare4Points(dim1: UnusedDimension, dim2: UnusedDimension): boolean {
        let result = dim1.points.filter(p1 => dim2.points.findIndex(p2 => p1.x === p2.x && p1.y === p2.y && p1.z === p2.z) > -1);
        return result.length === 4;
    }

}