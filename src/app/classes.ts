import * as moment from "moment";
import { generateGuid } from "./globals";

export class Container {
    height: number = null;
    width: number = null;
    length: number = null;
    goods: Good[] = [];
    constructor(height: number = null, width: number = null, length: number = null) {
        this.height = height;
        this.width = width;
        this.length = length;
    }
    getUnusedDimension(): UnusedDimension {
        let unusedDimension = new UnusedDimension(this.width, this.height, Infinity, null);
        unusedDimension.setPosition(0, 0, 0);
        return unusedDimension;
    }
}

export class Good {
    id: number = null;
    desc: string = null;
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
    constructor(id: number, x: number = null, y: number = null, z: number = null, sequenceNumber: number = null, description: string = null){
        this.id = id;
        this.x = x;
        this.y = y;
        this.z = z;
        this.sequenceNr = sequenceNumber;
        this.desc = description;
    }
    setOrderDimensions(order: Order){
        this.height = order.height;
        this.width = order.width;
        this.length = order.length;
        this.turningAllowed = order.turningAllowed;
        this.stackingAllowed = order.stackingAllowed;
        this.group = order.group;
    }
}

export class Group {
    color: string;
    id: number;
    desc: string;
}

export class Order {
    orderId: number = null;
    description: string = null;
    quantity: number = null;
    length: number = null;
    width: number = null;
    height: number = null;
    turningAllowed: boolean = true;
    stackingAllowed: boolean = false;
    group: number = null;
}

export class Point {
    x: number = null;
    y: number = null;
    z: number = null;
    constructor(x: number = null, y: number = null, z: number = null){
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

export class Product {
    description: string;
    height: number;
    length: number;
    width: number;
}

export class Space {
    width: number = null;
    height: number = null;
    length: number = null;
    constructor(width: number = null, height: number = null, length: number = null){
        this.width = width;
        this.height = height;
        this.length = length;
    }
}

export class Dimension extends Space {
    guid: string = generateGuid();
    x: number = null;
    y: number = null;
    z: number = null;
    r: number = null;
    t: number = null;
    f: number = null;
    points: Point[] = [];
    constructor(width: number = null, height: number = null, length: number = null){
        super(width, height, length);
    }
    setPosition(x: number, y: number, z: number){
        this.x = x;
        this.y = y;
        this.z = z;
        this.r = x + this.width;
        this.t = y + this.height;
        this.f = z + this.length;
        this.points = [
            new Point(this.x, this.y, this.z),
            new Point(this.r, this.y, this.z),
            new Point(this.x, this.y, this.f),
            new Point(this.r, this.y, this.f),
            new Point(this.x, this.t, this.z),
            new Point(this.r, this.t, this.z),
            new Point(this.x, this.t, this.f),
            new Point(this.r, this.t, this.f),
        ];
    }
}

export class UnusedDimension extends Dimension {
    stackedOn: number = null;
    groupRestrictedBy: number = null;
    constructor(width: number = null, height: number = null, length: number = null, stackedOn: number = null, groupRestrictedBy: number = null){
        super(width, height, length);
        this.stackedOn = stackedOn;
        this.groupRestrictedBy = groupRestrictedBy;
    }
}

export class Solution {
    id: string = null;
    container: Container = null;
    algorithm: string = null;
    groups: Group[] = [];
    steps: Step[] = [];
    calculated: string = null;
    description: string = null;
    constructor(id: string = generateGuid(), algorithm: string = null, calculated: string = moment().format('YYYY-MM-DDTHH:mm:ss')) {
        this.id = id;
        this.algorithm = algorithm;
        this.calculated = calculated;
    }
}

export class Step {
    sequenceNumber: number;
    messages: string[];
    unusedDimensions: UnusedDimension[];
    dimension: Dimension;
    usedDimension: UnusedDimension;
}
