import { IEditingContext } from "./i-editing-context";
import { IElement } from "./i-element";

export interface IDirectEditingEvent {
    active: {
        context: IEditingContext;
        element: IElement;
        provider: any;
    }
    type: 'directEditing.activate' | 'directEditing.cancel' | 'directEditing.complete' | 'directEditing.resize';
}
