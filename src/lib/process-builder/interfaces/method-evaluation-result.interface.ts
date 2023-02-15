import { MethodEvaluationStatus } from "../globals/method-evaluation-status";
import { MethodEvaluationResultType } from "../types/method-evaluation-result.type";

export interface IMethodEvaluationResult {
    status: MethodEvaluationStatus;
    injectorNavigationPath?: string;
    type?: MethodEvaluationResultType;
    detectedValue?: string | number | object | [] | boolean | null;
    valueIsDefinite: boolean;
}