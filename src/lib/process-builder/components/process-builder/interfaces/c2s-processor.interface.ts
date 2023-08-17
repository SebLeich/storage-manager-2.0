import { ITaskCreationOutput } from "../../dialog/task-creation/interfaces/task-creation-output.interface";

export interface IC2SProcessor {
    processConfiguration(configuration: ITaskCreationOutput): Promise<void> | void;
}