import { IElement } from "./i-element";

export interface IShapeDeleteExecutedEvent {
    command: "shape.delete";
    context: {
        hints: any;
        oldParent: IElement;
        oldParentIndex: number;
        shape: IElement;
    }
    id: number;
    type: "commandStack.shape.delete.executed";
}
