import { MethodEvaluationStatus } from "../globals/method-evaluation-status";

export interface IMethodEvaluationResult {
    status: MethodEvaluationStatus;
    returnPropertyPath?: string
}