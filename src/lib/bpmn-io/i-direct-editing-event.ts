import { IEditingContext } from "./interfaces/i-editing-context.interface";
import { IElement } from "./interfaces/i-element.interface";

export interface IDirectEditingEvent {
    active: {
        context: IEditingContext;
        element: IElement;
        provider: any;
    }
    type: 'directEditing.activate' | 'directEditing.cancel' | 'directEditing.complete' | 'directEditing.resize';
}
