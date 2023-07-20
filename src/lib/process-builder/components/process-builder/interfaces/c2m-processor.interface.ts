import { ITaskCreationFormGroupValue } from "@/lib/process-builder/interfaces/task-creation-form-group-value.interface";
import { ITaskCreationPayload } from "@/lib/process-builder/interfaces/task-creation-payload.interface";
import { C2mProcessingObjects } from "../constants/c2m-processing-objects.constant";

export interface IC2mProcessor {
    requirements?: (keyof C2mProcessingObjects)[];
    processConfiguration(configuration: { taskCreationPayload: ITaskCreationPayload, taskCreationFormGroupValue?: ITaskCreationFormGroupValue }, c2mProcessingObject?: Partial<C2mProcessingObjects>): Promise<Partial<C2mProcessingObjects> | undefined>;
}