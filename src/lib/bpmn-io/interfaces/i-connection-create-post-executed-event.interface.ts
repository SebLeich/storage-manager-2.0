import { IConnector } from "./connector.interface";
import { IElement } from "./element.interface";

export interface IConnectionCreatePostExecutedEvent {
    command: "connection.create"
    context: {
        connection: IConnector;
        cropped: boolean;
        hints: [];
        parent: IElement;
        parentIndex: number;
        rootElement: IElement;
        source: IElement;
        target: IElement;
    };
    id: number;
    type: "commandStack.connection.create.postExecuted"
}
