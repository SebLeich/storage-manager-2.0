import { v4 as generateGuid } from 'uuid';
import { IPoint } from '../interfaces/i-point.interface';
import { ISpace } from '../interfaces/i-space.interface';

export class Dimension implements ISpace {
    guid: string = generateGuid()
    width: number | null = null;
    height: number | null = null;
    length: number | null = null;
    x: number | null = null;
    y: number | null = null;
    z: number | null = null;
    r: number | null = null;
    t: number | null = null;
    f: number | null = null;
    points: IPoint[] = [];
    constructor(width: number | null = null, height: number | null = null, length: number | null = null) {
        this.width = width;
        this.height = height;
        this.length = length;
    }
    setPosition(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.r = x + this.width!;
        this.t = y + this.height!;
        this.f = z + this.length!;
        this.points = [
            { x: this.x, y: this.y, z: this.z },
            { x: this.r, y: this.y, z: this.z },
            { x: this.x, y: this.y, z: this.f },
            { x: this.r, y: this.y, z: this.f },
            { x: this.x, y: this.t, z: this.z },
            { x: this.r, y: this.t, z: this.z },
            { x: this.x, y: this.t, z: this.f },
            { x: this.r, y: this.t, z: this.f },
        ];
    }
}