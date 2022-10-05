import { IBusinessObject } from "./i-business-object.interface";
import { IElement } from "./i-element.interface";

export interface IConnector {
    height: number;
    id: string;
    type: string;
    width: number;
    businessObject: IBusinessObject;
    source: IElement;
    target: IElement;
}