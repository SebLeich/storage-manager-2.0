import { ITaskCreationOutput } from "../../dialog/task-creation/interfaces/task-creation-output.interface";

export interface IC2MProcessor {
    processConfiguration(configuration: ITaskCreationOutput): Promise<void> | void;
}