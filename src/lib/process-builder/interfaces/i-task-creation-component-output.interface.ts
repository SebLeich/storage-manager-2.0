import { ITaskCreationConfig } from "src/lib/process-builder/interfaces/i-task-creation-config.interface";

export interface ITaskCreationComponentOutput {
    config: ITaskCreationConfig;
    value: any;
}