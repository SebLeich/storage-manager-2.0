import { IConnector } from "src/lib/bpmn-io/i-connector";
import { IElement } from "src/lib/bpmn-io/i-element";
import { IParamDefinition } from "src/lib/process-builder/globals/i-param-definition";

export interface ITaskCreationComponentInput {
    data: ITaskCreationDataWrapper;
    bpmnJS: any;
}

export interface ITaskCreationDataWrapper {
    data: ITaskCreationData;
    payload: ITaskCreationPayload;
}

export interface ITaskCreationData {
    functionIdentifier: number | null;
    canFail: boolean | null;
    implementation: string[] | null;
    name: string | null;
    normalizedName: string | null;
    outputParamName: string | null;
    normalizedOutputParamName: string | null;
    outputParamValue: IParamDefinition[] | null;
    entranceGatewayType: number | null;
    inputParam: number | null;
}

export interface ITaskCreationPayload {
    configureIncomingErrorGatewaySequenceFlow: IConnector | undefined;
    configureActivity: IElement | undefined;
}
