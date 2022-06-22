import { IElement } from "./i-element"

export interface IEvent {
    element: IElement;
    gfx: SVGGElement;
    type: string;
}