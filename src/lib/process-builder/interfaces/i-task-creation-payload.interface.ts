import { IConnector } from "src/lib/bpmn-io/interfaces/i-connector.interface";
import { IElement } from "src/lib/bpmn-io/interfaces/i-element.interface";

export interface ITaskCreationPayload {
    configureIncomingErrorGatewaySequenceFlow: IConnector | undefined;
    configureActivity: IElement | undefined;
}