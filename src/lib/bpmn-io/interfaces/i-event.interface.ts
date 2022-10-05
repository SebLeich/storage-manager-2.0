import { IElement } from "./i-element.interface";

export interface IEvent {
    element: IElement;
    gfx: SVGGElement;
    type: string;
}