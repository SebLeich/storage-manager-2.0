import { v4 as generateGuid } from 'uuid';
import { IOrder, ISpace } from "@smgr/interfaces";
import { IVirtualDimension } from '../interfaces/virtual-dimension.interface';
import { ThreeDCalculationService } from '@/lib/shared/services/three-d-calculation.service';

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
        const dimension = ThreeDCalculationService.calculateSpatialPosition({ xCoord, yCoord, zCoord, width: rCoord - xCoord, height: tCoord - yCoord, length: fCoord - zCoord });
        return { ...dimension, id: generateGuid() } as IVirtualDimension;
    }

    protected getCombinableSpacePairs(unusedDimensions: IVirtualDimension[], returnFirstOnly = false): IVirtualDimension[][] {
        const output = [];
        for (const unusedDimension of unusedDimensions) {
            const result = [unusedDimension, ...unusedDimensions.filter((x: IVirtualDimension) => x === unusedDimension ? false : this._unusedDimensionsShare4Points(unusedDimension, x))];
            if (result.length > 1) {
                output.push(result);
                if (returnFirstOnly) break;
            }
        }

        return output;
    }

    protected putOrderAndCreateIVirtualDimensions(order: IOrder, virtualDimension: IVirtualDimension): IVirtualDimension[] {
        const virtualDimensions: IVirtualDimension[] = [];
        if (order.height < virtualDimension.height) {
            const above = ThreeDCalculationService.calculateSpatialPosition({
                xCoord: virtualDimension.xCoord,
                yCoord: virtualDimension.yCoord,
                zCoord: virtualDimension.zCoord,
                width: order.width,
                height: virtualDimension.height - order.height,
                length: order.length
            });

            virtualDimensions.push(above);
        }
        if (order.width < virtualDimension.width) {
            const next = ThreeDCalculationService.calculateSpatialPosition({
                xCoord: virtualDimension.xCoord + order.width,
                yCoord: virtualDimension.yCoord,
                zCoord: virtualDimension.zCoord,
                width: virtualDimension.width - order.width,
                height: virtualDimension.height,
                length: order.length
            });

            virtualDimensions.push(next as IVirtualDimension);
        }
        if (order.length < virtualDimension.length) {
            const infront = ThreeDCalculationService.calculateSpatialPosition({
                xCoord: virtualDimension.xCoord,
                yCoord: virtualDimension.yCoord,
                zCoord: virtualDimension.zCoord + order.length,
                width: virtualDimension.width,
                height: virtualDimension.height,
                length: virtualDimension.length - order.length
            });

            virtualDimensions.push(infront as IVirtualDimension);
        }
        return virtualDimensions;
    }

    private _unusedDimensionsShare4Points(dim1: IVirtualDimension, dim2: IVirtualDimension): boolean {
        const result = dim1.points.filter(p1 => dim2.points.findIndex(p2 => p1.xCoord === p2.xCoord && p1.yCoord === p2.yCoord && p1.zCoord === p2.zCoord) > -1);
        return result.length === 4;
    }

}