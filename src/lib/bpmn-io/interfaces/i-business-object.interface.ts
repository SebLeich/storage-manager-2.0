import { IExtensionElementsWrapper } from "./extension-elements-wrapper.interface";
import { IBusinessObjectConnector } from "./i-business-object-connector.interface";
import { IElement } from "./i-element.interface";

export interface IBusinessObject {
    $type: string;
    id: string;
    $attrs: any;
    $parent: IElement;
    incoming: IBusinessObjectConnector[];
    outgoing: IBusinessObjectConnector[];
    lanes: IElement[];
    extensionElements: IExtensionElementsWrapper;
    name?: string;
}
