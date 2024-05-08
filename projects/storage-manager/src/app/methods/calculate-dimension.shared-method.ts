import { IDimension } from "../../lib/storage-manager/interfaces/dimension.interface";

export default function(xCoord: number, yCoord: number, zCoord: number, width: number, height: number, length: number): Partial<IDimension> {
    const rCoord = xCoord + width;
    const tCoord = yCoord + height;
    const fCoord = zCoord + length;
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
        xCoord: xCoord,
        yCoord: yCoord,
        zCoord: zCoord,
        width: width,
        height: height,
        length: length,
        rCoord: rCoord,
        tCoord: tCoord,
        fCoord: fCoord,
        points: points
    }
}