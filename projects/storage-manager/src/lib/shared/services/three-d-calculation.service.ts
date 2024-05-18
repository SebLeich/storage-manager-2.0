import { Positioned } from '@/lib/storage-manager/types/positioned.type';
import { Spatial } from '@/lib/storage-manager/types/spatial.type';
import { SpatialPositioned } from '@/lib/storage-manager/types/spatial-positioned.type';
import { Injectable } from '@angular/core';

@Injectable()
export class ThreeDCalculationService {

    public static calculateSpatialPosition({ height, length, width, xCoord, yCoord, zCoord }: Positioned & Spatial): SpatialPositioned {
        const rCoord = xCoord + width,
            tCoord = yCoord + height,
            fCoord = zCoord + length;

        const points = [
            { xCoord: xCoord, yCoord: yCoord, zCoord: zCoord },
            { xCoord: rCoord, yCoord: yCoord, zCoord: zCoord },
            { xCoord: xCoord, yCoord: yCoord, zCoord: fCoord },
            { xCoord: rCoord, yCoord: yCoord, zCoord: fCoord },
            { xCoord: xCoord, yCoord: tCoord, zCoord: zCoord },
            { xCoord: rCoord, yCoord: tCoord, zCoord: zCoord },
            { xCoord: xCoord, yCoord: tCoord, zCoord: fCoord },
            { xCoord: rCoord, yCoord: tCoord, zCoord: fCoord },
        ];

        return {
            height,
            width,
            length,
            xCoord,
            yCoord,
            zCoord,
            rCoord,
            tCoord,
            fCoord,
            points
        };
    }
}
