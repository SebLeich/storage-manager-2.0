import { ITaskCreationPayload } from "../../../../interfaces/task-creation-payload.interface";
import { ITaskCreationFormGroupValue } from "../../../../interfaces/task-creation-form-group-value.interface";

export interface ITaskCreationInput {
    taskCreationFormGroupValue: ITaskCreationFormGroupValue;
    taskCreationPayload: ITaskCreationPayload;
}