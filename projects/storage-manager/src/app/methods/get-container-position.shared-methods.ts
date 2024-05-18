import { IPosition, IPositionedElement, ISpace } from '@smgr/interfaces';
import { v4 as generateGuid } from 'uuid';

export default function ({ height, length, width, xCoord, yCoord, zCoord }: IPositionedElement & ISpace, index: number = 0, groupRestrictedBy: number | null = null): IPosition {
    return {
        id: generateGuid(),
        index: index,
        groupRestrictedBy,
        height: height,
        width: width,
        length: length,
        rotated: false,
        xCoord: xCoord,
        yCoord: yCoord,
        zCoord: zCoord,
        rCoord: xCoord + width,
        tCoord: yCoord + height,
        fCoord: zCoord + length,
    };
}