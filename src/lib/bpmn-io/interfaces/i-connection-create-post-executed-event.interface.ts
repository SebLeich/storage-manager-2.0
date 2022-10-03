import { IConnector } from "./i-connector.interface";
import { IElement } from "./i-element.interface";

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
