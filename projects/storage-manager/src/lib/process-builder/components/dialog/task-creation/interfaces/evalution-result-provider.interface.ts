import { IMethodEvaluationResult } from "@/lib/process-builder/interfaces";
import { ITextLeaf } from "@/lib/process-builder/interfaces/text-leaf.interface";
import { Observable } from "rxjs";

export interface IEvaluationResultProvider
{
    customEvaluationResult$: Observable<IMethodEvaluationResult>;
    getEvaluationResult(implementation?: ITextLeaf | null): Promise<IMethodEvaluationResult>;
}
