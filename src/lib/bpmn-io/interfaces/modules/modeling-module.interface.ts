import { IConnector } from "../connector.interface";
import { IElement } from "../element.interface";

export interface IModelingModule {
    appendShape: (origin: IElement, type: { type: string }, position?: null | { x: number, y: number }) => IElement;
    connect: (origin: IElement, target: IElement) => IConnector;
    removeElements: (elements: (IElement | IConnector)[]) => void;
    setColor: (elements: IElement[], options: { stroke?: string, fill?: string }) => void;
    updateLabel: (element: IElement | IConnector, text: string) => void;
    updateProperties: (element: IElement | IConnector, data: any) => void;
}