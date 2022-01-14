import * as moment from "moment";
import { generateGuid } from "./globals";

export class Container {
    _Height: number = null;
    _Width: number = null;
    _Length: number = null;
    _Goods: Good[] = [];
    constructor(height: number = null, width: number = null, length: number = null) {
        this._Height = height;
        this._Width = width;
        this._Length = length;
    }
}

export class Dimension {
    height: number;
    width: number;
    length: number;
    x: number;
    y: number;
    z: number;
}

export class Good {
    _Id: number = null;
    _Desc: string = null;
    _Height: number = null;
    _Group: number = null;
    _Width: number = null;
    _Length: number = null;
    _Rotate: boolean = null;
    _Stack: boolean = null;
    _X: number = null;
    _Y: number = null;
    _Z: number = null;
    _SequenceNr: number = null;
    constructor(x: number = null, y: number = null, z: number = null, sequenceNumber: number = null, description: string = null){
        this._X = x;
        this._Y = y;
        this._Z = z;
        this._SequenceNr = sequenceNumber;
        this._Desc = description;
    }
    setOrderDimensions(order: Order){
        this._Height = order.height;
        this._Width = order.width;
        this._Length = order.length;
        this._Id = order.orderId;
        this._Rotate = order.turningAllowed;
        this._Stack = order.stackingAllowed;
        this._Group = order.group;
    }
}

export class Group {
    _Color: string;
    _Id: number;
    _Desc: string;
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

export class Position {
    _Id: string;
    _IsSumedUp: boolean;
    _X: number;
    _Y: number;
    _Z: number;
    _L: number;
    _W: number;
    _H: number;
    _R: number;
    _T: number;
    _F: number;
    IsRotated: boolean;
    index: number;
    area: number;
    _GroupRestrictionBy: number;
}

export class Product {
    description: string;
    height: number;
    length: number;
    width: number;
}

export class Solution {
    _Id: string = null;
    _Container: Container = null;
    _Algorithm: string = null;
    _Groups: Group[] = [];
    _Steps: Step[] = [];
    _Calculated: string = null;
    _Description: string = null;
    constructor(id: string = generateGuid(), algorithm: string = null, calculated: string = moment().format('YYYY-MM-DDTHH:mm:ss')) {
        this._Id = id;
        this._Algorithm = algorithm;
        this._Calculated = calculated;
    }
}

export class Step {
    _SequenceNumber: number;
    _Messages: string[];
    _Positions: Position[];
    _RecursiveGroupRestricted: [];
}
