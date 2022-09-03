import * as moment from "moment";
import { v4 as generateGuid } from 'uuid';
import { Container } from "./classes/container.class";
import { Dimension } from "./classes/dimension.class";
import { IGroup } from "./interfaces/i-group.interface";
import { IOrder } from "./interfaces/i-order.interface";
import { ISolution } from "./interfaces/i-solution.interface";
import { IStep } from "./interfaces/i-step";

export class Good {
    id!: number;
    desc: string | null = null;
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

export class UnusedDimension extends Dimension {
    stackedOn: number = 0;
    groupRestrictedBy?: number;
    constructor(width: number = 0, height: number = 0, length: number = 0, stackedOn: number = 0, groupRestrictedBy: number | undefined = undefined) {
        super(width, height, length);
        this.stackedOn = stackedOn;
        this.groupRestrictedBy = groupRestrictedBy;
    }
}

export class Solution implements ISolution {
    id: string = '';
    container?: Container;
    algorithm: string = '';
    groups: IGroup[] = [];
    steps: IStep[] = [];
    calculated: string = '';
    description: string = '';
    constructor(id: string = generateGuid(), algorithm: string = '', calculated: string = moment().format('YYYY-MM-DDTHH:mm:ss')) {
        this.id = id;
        this.algorithm = algorithm;
        this.calculated = calculated;
    }
}
