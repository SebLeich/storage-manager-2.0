import { IElement } from "src/lib/bpmn-io/interfaces/element.interface";

export interface IAutoPlace {
    append: (source: IElement, shape: IElement) => void;
}