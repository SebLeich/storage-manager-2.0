import { IElement } from "./i-element"

export interface IBusinessObjectConnector {
    $type: string;
    id: string;
    sourceRef: IElement;
    targetRef: IElement;
    parent: IElement;
}
