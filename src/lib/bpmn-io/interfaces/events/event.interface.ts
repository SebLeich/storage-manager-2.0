import { IElement } from "../element.interface";

export interface IEvent {
    element: IElement;
    gfx: SVGGElement;
    type: string;
}