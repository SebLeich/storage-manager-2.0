import { IBusinessObjectConnector } from "./i-business-object-connector";
import { IElement } from "./i-element";

export interface IBusinessObject {
    $type: string;
    id: string;
    $attrs: any;
    $parent: IElement;
    incoming: IBusinessObjectConnector[];
    outgoing: IBusinessObjectConnector[];
    lanes: IElement[];
    extensionElements: any;
    name?: string;
}
