import { IEditingContext } from "./editing-context.interface";
import { IElement } from "./element.interface";

export interface IDirectEditingEvent {
    active: {
        context: IEditingContext;
        element: IElement;
        provider: any;
    }
    type: 'directEditing.activate' | 'directEditing.cancel' | 'directEditing.complete' | 'directEditing.resize';
}
