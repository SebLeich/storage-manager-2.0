import { Injectable } from "@angular/core";
import { IParam } from "@/lib/process-builder/interfaces";
import { Store } from "@ngrx/store";
import { removeIParam, upsertIParam } from "@/lib/process-builder/store";
import { IC2SProcessor } from "../interfaces/c2s-processor.interface";
import { ITaskCreationOutput } from "../../dialog/task-creation/interfaces/task-creation-output.interface";
import { FunctionOutputService } from "../services/function-output.service";
import { ParamType } from "@/lib/process-builder/types/param.type";

@Injectable()
export class OutputC2SProcessor implements IC2SProcessor {

    private readonly _functionOutputService = new FunctionOutputService(this._store);

    constructor(private _store: Store){ }

    public async processConfiguration({ formValue, taskCreationPayload, selectedFunction, methodEvaluation }: ITaskCreationOutput) {
        const configureActivity = taskCreationPayload.configureActivity;
        if (!configureActivity || !formValue) {
            return;
        }

        const { hasOutput, outputParamIsRemoved, outputParamIdentifier, outputParamObject, outputParamInterface, outputParamType } = await this._functionOutputService.detectFunctionOutput(selectedFunction, methodEvaluation);
        if(!hasOutput) {
            if(outputParamIsRemoved){
                this._store.dispatch(removeIParam(outputParamIdentifier));
            }

            return;
        }

        let outputParam: IParam | null = outputParamObject ? { ...outputParamObject }: null;
        if (!outputParam) {
            outputParam = {
                _isIParam: true,
                identifier: outputParamIdentifier,
                isCollection: formValue.outputIsArray,
                constant: null,
                typeDef: null,
                defaultValue: null,
            } as IParam;
        }

        outputParam = {
            ...outputParam,
            interface: formValue.outputParamInterface ?? outputParamInterface,
            isProcessOutput: false,
            name: formValue.outputParamName,
            normalizedName: formValue.outputParamNormalizedName,
            type: outputParamType as ParamType,
            defaultValue:  methodEvaluation?.detectedValue ?? null,
        }

        if(formValue.outputIsArray){
            outputParam = {
                ...outputParam,
                interface: null,
                type: 'array',
                typeDef: [
                    {
                        ...outputParam,
                        interface: outputParam.interface
                    }
                ]
            }
        }

        this._store.dispatch(upsertIParam(outputParam));
    }
}