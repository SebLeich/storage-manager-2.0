import { IExtensionElement } from "./extension-element.interface";

export interface IExtensionElementsWrapper {
    values: IExtensionElement[];
    get: (key: keyof IExtensionElementsWrapper) => any;
}