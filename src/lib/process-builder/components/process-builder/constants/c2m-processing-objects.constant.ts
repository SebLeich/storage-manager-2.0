import { IElement } from "@/lib/bpmn-io/interfaces/element.interface";
import { IFunction } from "@/lib/process-builder/interfaces";

export type C2mProcessingObjects = {
    updatedFunction: IFunction;
    resultingGateway: IElement;
};