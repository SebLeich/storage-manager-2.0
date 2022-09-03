import { v4 as generateGuid } from 'uuid';
import { IContainer } from "../interfaces/i-container.interface";
import { IGood } from "../interfaces/i-good.interface";
import { IVirtualDimension } from "../interfaces/i-virtual-dimension.interface";
import calculateDimensionSharedMethod from '../methods/calculate-dimension.shared-method';

export class Container implements IContainer {
    id!: string;
    height!: number;
    width!: number;
    length!: number;
    xCoord!: number;
    yCoord!: number;
    zCoord!: number;
    goods: IGood[] = [];
    constructor(id: string = generateGuid(), height: number, width: number, length: number) {
        this.id = id;
        this.height = height;
        this.width = width;
        this.length = length;
    }
    getVirtualDimensionOfUnusedSpace: () => IVirtualDimension = () => {
        return { ...calculateDimensionSharedMethod(this.xCoord, this.yCoord, this.zCoord, this.width, this.height, Infinity), id: this.id } as IVirtualDimension;
    }
}