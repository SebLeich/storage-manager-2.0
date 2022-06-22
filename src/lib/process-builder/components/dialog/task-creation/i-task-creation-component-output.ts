import { ITaskCreationConfig } from "src/lib/process-builder/globals/i-task-creation-config";

export interface ITaskCreationComponentOutput {
    config: ITaskCreationConfig;
    value: any;
}
