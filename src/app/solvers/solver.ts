import { UnusedDimension, Order, Space } from "../classes";
import { MinimizationFunction } from "../globals";

export class Solver {

    private _minimizationFunctions: { [key: number]: (space: UnusedDimension) => number } = {};

    constructor() {
        this._minimizationFunctions[MinimizationFunction.MIN_VOLUME] = (space: UnusedDimension) => space.height * space.length * space.width;
        this._minimizationFunctions[MinimizationFunction.MIN_X] = (space: UnusedDimension) => space.xCoord;
        this._minimizationFunctions[MinimizationFunction.MIN_Y] = (space: UnusedDimension) => space.yCoord;
        this._minimizationFunctions[MinimizationFunction.MIN_Z] = (space: UnusedDimension) => space.zCoord;
    }

    protected canPlaceOrderIntoSpace(order: Order, space: Space): { notTurned: boolean, turned: boolean } {
        return {
            notTurned: space.width >= order.width && space.length >= order.length && space.height >= order.height,
            turned: space.width >= order.length && space.length >= order.width && space.height >= order.height,
        };
    }

    protected combineSpaces(unusedDimensions: UnusedDimension[]): UnusedDimension {
        let x = Math.min(...unusedDimensions.map(x => x.xCoord));
        let y = Math.min(...unusedDimensions.map(x => x.yCoord));
        let z = Math.min(...unusedDimensions.map(x => x.zCoord));
        let r = Math.max(...unusedDimensions.map(x => x.rCoord));
        let t = Math.max(...unusedDimensions.map(x => x.tCoord));
        let f = Math.max(...unusedDimensions.map(x => x.fCoord));
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
            above.setPosition(unusedDimension.xCoord, unusedDimension.yCoord + order.height, unusedDimension.zCoord);
            unusedDimensions.push(above);
        }
        if (order.width < unusedDimension.width) {
            let next = new UnusedDimension(unusedDimension.width - order.width, unusedDimension.height, order.length);
            next.setPosition(unusedDimension.xCoord + order.width, unusedDimension.yCoord, unusedDimension.zCoord);
            unusedDimensions.push(next);
        }
        if (order.length < unusedDimension.length) {
            let infront = new UnusedDimension(unusedDimension.width, unusedDimension.height, unusedDimension.length - order.length);
            infront.setPosition(unusedDimension.xCoord, unusedDimension.yCoord, unusedDimension.zCoord + order.length);
            unusedDimensions.push(infront);
        }
        return unusedDimensions;
    }

    private _unusedDimensionsShare4Points(dim1: UnusedDimension, dim2: UnusedDimension): boolean {
        let result = dim1.points.filter(p1 => dim2.points.findIndex(p2 => p1.xCoord === p2.xCoord && p1.yCoord === p2.yCoord && p1.zCoord === p2.zCoord) > -1);
        return result.length === 4;
    }

}