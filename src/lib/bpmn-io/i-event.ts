import { IElement } from "./interfaces/i-element.interface"

export interface IEvent {
    element: IElement;
    gfx: SVGGElement;
    type: string;
}