import { ITaskCreationPayload } from "./task-creation-payload.interface";
import { ITaskCreationFormGroupValue } from "./task-creation-form-group-value.interface";

export interface ITaskCreationDataWrapper {
    taskCreationFormGroupValue: ITaskCreationFormGroupValue;
    taskCreationPayload: ITaskCreationPayload;
}