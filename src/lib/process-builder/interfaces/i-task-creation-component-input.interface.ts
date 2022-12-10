import { IBpmnJS } from "./i-bpmn-js.interface";
import { ITaskCreationDataWrapper } from "./i-task-creation-data-wrapper.interface";

export interface ITaskCreationComponentInput {
    data: ITaskCreationDataWrapper;
    bpmnJS?: IBpmnJS;
}
