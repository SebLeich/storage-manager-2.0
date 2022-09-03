import { Good, UnusedDimension } from "../classes";
import { ISpace } from "../interfaces/i-space.interface";

export class Container implements ISpace {
    height: number | null = null;
    width: number | null = null;
    length: number | null = null;
    goods: Good[] = [];
    constructor(height: number | null = null, width: number | null = null, length: number | null = null) {
        this.height = height;
        this.width = width;
        this.length = length;
    }
    getUnusedDimension(): UnusedDimension {
        let unusedDimension = new UnusedDimension(this.width!, this.height!, Infinity);
        unusedDimension.setPosition(0, 0, 0);
        return unusedDimension;
    }
}