import { IVirtualDimension } from "../interfaces/i-virtual-dimension.interface";
import { Dimension } from "./dimension.class";

export class VirtualDimension extends Dimension implements IVirtualDimension {
    stackedOn?: number;
    groupRestrictedBy?: number;
    constructor(width: number, height: number, length: number, stackedOn?: number, groupRestrictedBy?: number) {
        super(width, height, length);
        this.stackedOn = stackedOn;
        this.groupRestrictedBy = groupRestrictedBy;
    }
}