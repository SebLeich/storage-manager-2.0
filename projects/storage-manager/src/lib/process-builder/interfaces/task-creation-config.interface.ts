import { Observable } from "rxjs";
import { TaskCreationStep } from "../globals/task-creation-step";

export interface ITaskCreationConfig {
    taskCreationStep: TaskCreationStep;
    payload?: any;
    element: any;
    disabled$?: Observable<boolean>;
    autoProceed$?: Observable<number>;
}
