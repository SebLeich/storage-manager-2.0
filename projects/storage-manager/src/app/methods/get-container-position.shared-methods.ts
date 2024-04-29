import { IContainer, IGood, IPosition } from '@smgr/interfaces';
import { v4 as generateGuid } from 'uuid';

export default function (container: IContainer | IGood, index: number = 0): IPosition {
    return {
        id: generateGuid(),
        index: index,
        height: container.height,
        width: container.width,
        length: container.length,
        rotated: false,
        xCoord: container.xCoord,
        yCoord: container.yCoord,
        zCoord: container.zCoord,
        rCoord: container.xCoord + container.width,
        tCoord: container.yCoord + container.height,
        fCoord: container.zCoord + container.length,
    } as IPosition;
}