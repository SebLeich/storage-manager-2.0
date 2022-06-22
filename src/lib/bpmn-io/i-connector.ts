import { IBusinessObject } from "./i-business-object";
import { IElement } from "./i-element";

export interface IConnector {
    height: number;
    id: string;
    type: string;
    width: number;
    businessObject: IBusinessObject;
    source: IElement;
    target: IElement;
}