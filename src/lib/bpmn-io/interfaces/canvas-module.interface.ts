import { IViewbox } from "./i-viewbox.interface";

export interface ICanvasModule {
    viewbox: (viewbox?: IViewbox) => IViewbox;
    zoom(viewbox: 'fit-viewport', focus?: 'auto'): void;
}