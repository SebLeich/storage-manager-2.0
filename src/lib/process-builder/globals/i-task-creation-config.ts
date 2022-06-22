import { Observable } from "rxjs";
import { TaskCreationStep } from "./task-creation-step";

export interface ITaskCreationConfig {
    taskCreationStep: TaskCreationStep;
    payload?: any;
    element: any;
    disabled$?: Observable<boolean>;
}
