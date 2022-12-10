import { IElement } from "./element.interface"

export interface IBusinessObjectConnector {
    $type: string;
    id: string;
    sourceRef: IElement;
    targetRef: IElement;
    parent: IElement;
}
