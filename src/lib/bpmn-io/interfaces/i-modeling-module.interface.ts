import { IConnector } from "./i-connector.interface";
import { IElement } from "./i-element.interface";

export interface IModelingModule {
    appendShape: (origin: IElement, type: { type: string }, position: null | { x: number, y: number }) => IElement;
    connect: (origin: IElement, target: IElement) => IConnector;
    removeElements: (elements: IElement[] | IConnector[]) => void;
    updateLabel: (element: IElement | IConnector, text: string) => void;
    updateProperties: (element: IElement | IConnector, data: any) => void;
}