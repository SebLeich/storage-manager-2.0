export class Container {
    _Height: number;
    _Width: number;
    _Length: number;
    _Goods: Good[];
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
    _Id: number;
    _Desc: string;
    _Height: number;
    _Group: number;
    _Width: number;
    _Length: number;
    _Rotate: boolean;
    _Stack: boolean;
    _X: number;
    _Y: number;
    _Z: number;
    _SequenceNr: number;
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
    _Id: string;
    _Container: Container;
    _Algorithm: string;
    _Groups: Group[];
    _Steps: Step[];
    _Calculated: string;
    _Description: string;
}

export class Step {
    _SequenceNumber: number;
    _Messages: string[];
    _Positions: Position[];
    _RecursiveGroupRestricted: [];
}
