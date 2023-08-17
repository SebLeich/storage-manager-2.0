import { CodemirrorRepository } from "@/lib/core/codemirror.repository";
import { MethodEvaluationStatus } from "@/lib/process-builder/globals/method-evaluation-status";
import { selectSnapshot } from "@/lib/process-builder/globals/select-snapshot";
import { IFunction, IMethodEvaluationResult } from "@/lib/process-builder/interfaces";
import { selectIParam, selectNextParameterIdentifier } from "@/lib/process-builder/store/selectors";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

@Injectable()
export class FunctionOutputService {

    constructor(private _store: Store) { }

    public async detectFunctionOutput(selectedFunction: IFunction, methodEvaluation?: IMethodEvaluationResult) {
        let hasOutput = false,
            outputParamIsRemoved = false,
            outputParamIsNew = false,
            outputParamIdentifier = null,
            outputParamObject = null;

        if (selectedFunction._isImplementation) {
            if(selectedFunction.requireCustomImplementation){
                if(!methodEvaluation){
                    methodEvaluation = CodemirrorRepository.evaluateCustomMethod(undefined, selectedFunction.implementation, undefined, undefined);
                }

                hasOutput = methodEvaluation.status === MethodEvaluationStatus.ReturnValueFound;
                outputParamIsRemoved = typeof selectedFunction.output === 'number' && !hasOutput;
                outputParamIsNew = typeof selectedFunction.output !== 'number' && hasOutput;
                outputParamIdentifier = hasOutput ? outputParamIsNew ? await selectSnapshot(this._store.select(selectNextParameterIdentifier())) : selectedFunction.output : null;
            }
            else {
                hasOutput = typeof selectedFunction.output === 'number';
                outputParamIdentifier = hasOutput ? selectedFunction.output : null;
            }
        }
        else {
            hasOutput = selectedFunction.outputTemplate ? true : false;
            outputParamIsNew = true;
            outputParamIdentifier = await selectSnapshot(this._store.select(selectNextParameterIdentifier()));
        }

        if(!outputParamIsNew){
            outputParamObject = await selectSnapshot(this._store.select(selectIParam(outputParamIdentifier)));
        }

        return { hasOutput, outputParamIsNew, outputParamIsRemoved, outputParamIdentifier, outputParamObject };
    }
}