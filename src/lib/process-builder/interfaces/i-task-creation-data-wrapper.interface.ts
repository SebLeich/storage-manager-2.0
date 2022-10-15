import { ITaskCreationData } from "./i-task-creation-data.interface";
import { ITaskCreationPayload } from "./i-task-creation-payload.interface";

export interface ITaskCreationDataWrapper {
    taskCreationData: ITaskCreationData;
    taskCreationPayload: ITaskCreationPayload;
}