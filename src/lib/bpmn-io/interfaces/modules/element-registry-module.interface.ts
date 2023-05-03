import { IConnector } from "../connector.interface";
import { IElement } from "../element.interface";

export interface IElementRegistryModule {
    add: (element: IElement) => void;
    filter: (cond: (e: IElement | IConnector) => boolean) => (IElement|IConnector)[];
    find: (cond: (e: IElement) => boolean) => IElement | undefined;
    forEach: (arg: (e: IElement) => void) => void;
    get: (id: string) => IElement | IConnector | undefined;
    getAll: () => IElement[];
    remove: (element: IElement) => void;
    updateId: (element: IElement, id: string) => void;
    /*
    getGraphics: ƒ (e, t)
    updateGraphics: ƒ (e, t, n)
    */
}