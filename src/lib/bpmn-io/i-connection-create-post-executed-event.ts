import { IConnector } from "./i-connector";
import { IElement } from "./i-element";

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
