import { IC2SOutput } from "../../dialog/task-creation/interfaces/c2S-output.interface";
import { ITaskCreationOutput } from "../../dialog/task-creation/interfaces/task-creation-output.interface";

export interface IC2MProcessor {
    processConfiguration(configuration: ITaskCreationOutput, c2SOutput: IC2SOutput): Promise<void> | void;
}