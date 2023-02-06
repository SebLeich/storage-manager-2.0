import { IElement } from "./element.interface";

export interface IShapeCreateEvent {
    command: "shape.create";
    context: {
        hints: object;
        host: any;
        parent: IElement;
        parentIndex: number;
        position: { x: number, y: number };
        rootElement: IElement;
        shape: IElement;
    };
    id: number;
    type: "commandStack.shape.create.postExecuted";
}