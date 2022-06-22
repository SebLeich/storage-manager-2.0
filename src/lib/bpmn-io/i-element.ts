import { IBusinessObject } from "./i-business-object";
import { IConnector } from "./i-connector";

export interface IElement {
    children: [];
    di: any;
    height: number;
    id: string;
    labels: [];
    order: { level: 5 };
    type: string;
    width: number;
    x: number;
    y: number;
    attachers: () => IElement[];
    businessObject: IBusinessObject;
    incoming: IConnector[];
    outgoing: IConnector[];
}
