import { IStyle } from "./i-style.interface";

export interface IEditingContext {
    bounds: { x: number, y: number, width: number, height: number };
    options: { centerVertically: boolean }
    style: IStyle;
    text: string;
}
