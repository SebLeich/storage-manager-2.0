import { IElement } from "@/lib/bpmn-io/interfaces/element.interface";
import { IFunction, IParam } from "@/lib/process-builder/interfaces";

export type C2mProcessingObjects = {
    updatedFunction: IFunction;
    resultingGateway: IElement;
    outputParam: IParam;
};