import { IElement } from "../element.interface";

export interface IGraphicsFactory {
    update: (type: string, element: IElement, gfx: any) => void;
}