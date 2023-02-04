import { ITaskCreationData } from "./task-creation-data.interface";
import { ITaskCreationPayload } from "./task-creation-payload.interface";

export interface ITaskCreationDataWrapper {
    taskCreationData: ITaskCreationData;
    taskCreationPayload: ITaskCreationPayload;
}