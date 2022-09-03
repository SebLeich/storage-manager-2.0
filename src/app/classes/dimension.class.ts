import { v4 as generateGuid } from 'uuid';
import { IDimension } from '../interfaces/i-dimension.interface';
import { IPositionedElement } from '../interfaces/i-positioned.interface';

export class Dimension implements IDimension {
    id: string = generateGuid()
    width!: number;
    height!: number;
    length!: number;
    xCoord!: number;
    yCoord!: number;
    zCoord!: number;
    rCoord!: number;
    tCoord!: number;
    fCoord!: number;
    points: IPositionedElement[] = [];
    constructor(width: number, height: number, length: number) {
        this.width = width;
        this.height = height;
        this.length = length;
    }
    updatePosition(args: { xCoord?: number, yCoord?: number, zCoord?: number }) {
        if (args.xCoord) {
            this.xCoord = args.xCoord;
        }
        if (args.yCoord) {
            this.yCoord = args.yCoord;
        }
        if (args.zCoord) {
            this.zCoord = args.zCoord;
        }
        this.updateInternalFields();
    }
    updateInternalFields() {
        this.rCoord = this.xCoord + this.width!;
        this.tCoord = this.yCoord + this.height!;
        this.fCoord = this.zCoord + this.length!;
        this.points = [
            { xCoord: this.xCoord, yCoord: this.yCoord, zCoord: this.zCoord },
            { xCoord: this.rCoord, yCoord: this.yCoord, zCoord: this.zCoord },
            { xCoord: this.xCoord, yCoord: this.yCoord, zCoord: this.fCoord },
            { xCoord: this.rCoord, yCoord: this.yCoord, zCoord: this.fCoord },
            { xCoord: this.xCoord, yCoord: this.tCoord, zCoord: this.zCoord },
            { xCoord: this.rCoord, yCoord: this.tCoord, zCoord: this.zCoord },
            { xCoord: this.xCoord, yCoord: this.tCoord, zCoord: this.fCoord },
            { xCoord: this.rCoord, yCoord: this.tCoord, zCoord: this.fCoord },
        ];
    }
}