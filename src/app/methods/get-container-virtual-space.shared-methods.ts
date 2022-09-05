import { v4 as generateGuid } from 'uuid';
import { IContainer } from "../interfaces/i-container.interface";
import { IVirtualDimension } from "../interfaces/i-virtual-dimension.interface";
import calculateDimensionSharedMethod from './calculate-dimension.shared-method';

export default function (container: IContainer): IVirtualDimension {
    const dimension = calculateDimensionSharedMethod(container.xCoord, container.yCoord, container.zCoord, container.width, container.height, container.length);
    return {
        ...dimension,
        length: Infinity,
        fCoord: Infinity,
        id: generateGuid()
    } as IVirtualDimension;
}