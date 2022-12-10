import { IConnector } from "src/lib/bpmn-io/interfaces/connector.interface";
import { IElement } from "src/lib/bpmn-io/interfaces/element.interface";

export interface ITaskCreationPayload {
    configureIncomingErrorGatewaySequenceFlow: IConnector | undefined;
    configureActivity: IElement | undefined;
}