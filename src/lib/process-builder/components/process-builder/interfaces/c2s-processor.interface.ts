import { ITaskCreationFormGroupValue } from "@/lib/process-builder/interfaces/task-creation-form-group-value.interface";
import { ITaskCreationPayload } from "@/lib/process-builder/interfaces/task-creation-payload.interface";

export interface IC2SProcessor {
    processConfiguration(configuration: { taskCreationPayload: ITaskCreationPayload, taskCreationFormGroupValue?: ITaskCreationFormGroupValue }): Promise<void> | void;
}