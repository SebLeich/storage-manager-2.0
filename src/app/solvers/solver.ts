import { IOrder } from "../interfaces/i-order.interface";
import { ISpace } from "../interfaces/i-space.interface";
import { IVirtualDimension } from "../interfaces/i-virtual-dimension.interface";
import calculateDimensionSharedMethod from "../methods/calculate-dimension.shared-method";
import { v4 as generateGuid } from 'uuid';

export class Solver {

    protected canPlaceOrderIntoSpace(order: IOrder, space: ISpace): { notTurned: boolean, turned: boolean } {
        return {
            notTurned: space.width >= order.width && space.length >= order.length && space.height >= order.height,
            turned: space.width >= order.length && space.length >= order.width && space.height >= order.height,
        };
    }

    protected combineSpaces(virtualDimensions: IVirtualDimension[]): IVirtualDimension {
        const xCoord = Math.min(...virtualDimensions.map(dimension => dimension.xCoord));
        const yCoord = Math.min(...virtualDimensions.map(dimension => dimension.yCoord));
        const zCoord = Math.min(...virtualDimensions.map(dimension => dimension.zCoord));
        const rCoord = Math.max(...virtualDimensions.map(dimension => dimension.rCoord));
        const tCoord = Math.max(...virtualDimensions.map(dimension => dimension.tCoord));
        const fCoord = Math.max(...virtualDimensions.map(dimension => dimension.fCoord));
        const dimension = calculateDimensionSharedMethod(xCoord, yCoord, zCoord, rCoord - xCoord, tCoord - yCoord, fCoord - zCoord);
        return { ...dimension, id: generateGuid() } as IVirtualDimension;
    }

    protected getCombinableSpacePairs(unusedDimensions: IVirtualDimension[], returnFirstOnly: boolean = false): IVirtualDimension[][] {
        let output = [];
        for (let unusedDimension of unusedDimensions) {
            let result = [unusedDimension, ...unusedDimensions.filter((x: IVirtualDimension) => x === unusedDimension ? false : this._unusedDimensionsShare4Points(unusedDimension, x))];
            if (result.length > 1) {
                output.push(result);
                if (returnFirstOnly) break;
            }
        }
        return output;
    }

    protected putOrderAndCreateIVirtualDimensions(order: IOrder, virtualDimension: IVirtualDimension): IVirtualDimension[] {
        let virtualDimensions: IVirtualDimension[] = [];
        if (order.height < virtualDimension.height) {
            const above = calculateDimensionSharedMethod(virtualDimension.xCoord, virtualDimension.yCoord, virtualDimension.zCoord, order.width, virtualDimension.height - order.height, order.length);
            virtualDimensions.push(above as IVirtualDimension);
        }
        if (order.width < virtualDimension.width) {
            const next = calculateDimensionSharedMethod(virtualDimension.xCoord + order.width, virtualDimension.yCoord, virtualDimension.zCoord, virtualDimension.width - order.width, virtualDimension.height, order.length);
            virtualDimensions.push(next as IVirtualDimension);
        }
        if (order.length < virtualDimension.length) {
            const infront = calculateDimensionSharedMethod(virtualDimension.xCoord, virtualDimension.yCoord, virtualDimension.zCoord + order.length, virtualDimension.width, virtualDimension.height, virtualDimension.length - order.length);
            virtualDimensions.push(infront as IVirtualDimension);
        }
        return virtualDimensions;
    }

    private _unusedDimensionsShare4Points(dim1: IVirtualDimension, dim2: IVirtualDimension): boolean {
        let result = dim1.points.filter(p1 => dim2.points.findIndex(p2 => p1.xCoord === p2.xCoord && p1.yCoord === p2.yCoord && p1.zCoord === p2.zCoord) > -1);
        return result.length === 4;
    }

}