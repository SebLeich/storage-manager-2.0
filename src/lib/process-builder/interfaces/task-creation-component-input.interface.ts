import { IBpmnJS } from "./bpmn-js.interface";
import { ITaskCreationDataWrapper } from "./task-creation-data-wrapper.interface";

export interface ITaskCreationComponentInput {
    data: ITaskCreationDataWrapper;
    bpmnJS?: IBpmnJS;
}
