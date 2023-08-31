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
            outputParamObject = null,
            outputParamInterface = null,
            outputParamType = null;

        if (selectedFunction._isImplementation) {
            if(selectedFunction.requireCustomImplementation){
                if(!methodEvaluation){
                    methodEvaluation = CodemirrorRepository.evaluateCustomMethod(undefined, selectedFunction.implementation, undefined, undefined);
                }

                hasOutput = methodEvaluation.status === MethodEvaluationStatus.ReturnValueFound;
                outputParamIsRemoved = typeof selectedFunction.output === 'number' && !hasOutput;
                outputParamIsNew = typeof selectedFunction.output !== 'number' && hasOutput;
                outputParamIdentifier = hasOutput ? outputParamIsNew ? await selectSnapshot(this._store.select(selectNextParameterIdentifier())) : selectedFunction.output : null;
                outputParamInterface = hasOutput ? methodEvaluation.interface ?? null : null;
                outputParamType = methodEvaluation.type ?? null;
            }
            else {
                hasOutput = typeof selectedFunction.output === 'number';
                if(hasOutput){
                    outputParamObject = await selectSnapshot(this._store.select(selectIParam(outputParamIdentifier)));
                    outputParamIdentifier = selectedFunction.output;
                    outputParamInterface = selectedFunction.outputTemplate;
                    outputParamType = outputParamObject?.type;
                }
            }
        }
        else {
            if(selectedFunction.outputTemplate === 'dynamic'){
                if(!methodEvaluation){
                    throw('method evaluation is required for dynamic output!');
                }

                hasOutput = methodEvaluation.status === MethodEvaluationStatus.ReturnValueFound;
                outputParamIsRemoved = false;
                outputParamIsNew = true;
                outputParamIdentifier = await selectSnapshot(this._store.select(selectNextParameterIdentifier()));
                outputParamInterface = methodEvaluation.interface ?? null;
                outputParamType = methodEvaluation.type ?? null;
            }
            else {
                hasOutput = selectedFunction.outputTemplate ? true : false;

                if(hasOutput){
                    outputParamIsNew = true;
                    outputParamIdentifier = await selectSnapshot(this._store.select(selectNextParameterIdentifier()));
                    outputParamInterface = selectedFunction.outputTemplate;
                    outputParamType = 'object';
                }
            }
        }

        if(!outputParamIsNew){
            outputParamObject = await selectSnapshot(this._store.select(selectIParam(outputParamIdentifier)));
            outputParamType = outputParamObject?.type;
        }

        return { hasOutput, outputParamIsNew, outputParamIsRemoved, outputParamIdentifier, outputParamObject, outputParamInterface, outputParamType };
    }
}