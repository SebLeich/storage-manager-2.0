import { MethodEvaluationStatus } from "../globals/method-evaluation-status";
import { ParamType } from "../types/param.type";

export interface IMethodEvaluationResult {
    status: MethodEvaluationStatus;
    injectorNavigationPath?: string;
    paramName?: string;
    type?: ParamType;
    detectedValue?: string | number | object | [] | boolean | null;
    valueIsDefinite: boolean;
    unaryExpression?: string;
    variableDeclaration?: string;
    interface?: string;
    inputParamCandidates?: string[];
}