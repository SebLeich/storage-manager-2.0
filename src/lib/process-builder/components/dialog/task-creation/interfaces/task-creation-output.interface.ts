import { IFunction, IMethodEvaluationResult } from "@/lib/process-builder/interfaces";
import { ITaskCreationFormGroupValue } from "@/lib/process-builder/interfaces/task-creation-form-group-value.interface";
import { ITaskCreationPayload } from "@/lib/process-builder/interfaces/task-creation-payload.interface";

export interface ITaskCreationOutput {
    formValue: ITaskCreationFormGroupValue;
    initialFormValue: ITaskCreationFormGroupValue;
    taskCreationPayload: ITaskCreationPayload;
    methodEvaluation: IMethodEvaluationResult;
    selectedFunction: IFunction;
}
