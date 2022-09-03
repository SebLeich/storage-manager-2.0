import { IGood } from "./interfaces/i-good.interface";
import { IOrder } from "./interfaces/i-order.interface";

export class Good implements IGood {
    id!: string;
    desc?: string;
    height: number = null;
    group: number = null;
    width: number = null;
    length: number = null;
    turningAllowed: boolean = null;
    turned: boolean = null;
    stackingAllowed: boolean = null;
    stackedOnGood: number = null;
    x: number = null;
    y: number = null;
    z: number = null;
    sequenceNr: number = null;
    constructor(id: number, x: number = null, y: number = null, z: number = null, sequenceNumber: number = null, description: string = null) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.z = z;
        this.sequenceNr = sequenceNumber;
        this.desc = description;
    }
    setOrderDimensions(order: IOrder) {
        this.height = order.height;
        this.width = order.width;
        this.length = order.length;
        this.turningAllowed = order.turningAllowed;
        this.stackingAllowed = order.stackingAllowed;
        this.group = order.group;
    }
}
