import { ITaskCreationFormGroupValue } from "@/lib/process-builder/interfaces/task-creation-form-group-value.interface";
import { ITaskCreationPayload } from "@/lib/process-builder/interfaces/task-creation-payload.interface";
import { BPMNJsRepository } from "@/lib/core/bpmn-js.repository";
import { Inject, Injectable } from "@angular/core";
import { IMethodEvaluationResult, IParam, IParamDefinition, IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from "@/lib/process-builder/interfaces";
import { Store } from "@ngrx/store";
import { CodemirrorRepository } from "@/lib/core/codemirror.repository";
import { MethodEvaluationStatus } from "@/lib/process-builder/globals/method-evaluation-status";
import defaultImplementation from "@/lib/process-builder/globals/default-implementation";
import { ProcessBuilderRepository } from "@/lib/core/process-builder-repository";
import { firstValueFrom, map, shareReplay } from "rxjs";
import { selectIParam, selectIParams } from "@/lib/process-builder/store/selectors";
import { mapIParamInterfaces } from "@/lib/process-builder/extensions/rxjs/map-param-interfaces.rxjs";
import { removeIParam, upsertIParam } from "@/lib/process-builder/store";
import { IElement } from "@/lib/bpmn-io/interfaces/element.interface";
import { mapIParamsInterfaces } from "@/lib/process-builder/extensions/rxjs/map-params-interfaces.rxjs";
import { deepObjectLookup } from "@/lib/shared/globals/deep-object-lookup.function";
import { selectSnapshot } from "@/lib/process-builder/globals/select-snapshot";
import { IC2SProcessor } from "../interfaces/c2s-processor.interface";

@Injectable()
export class OutputC2SProcessor implements IC2SProcessor {

    constructor(@Inject(PROCESS_BUILDER_CONFIG_TOKEN) private _config: IProcessBuilderConfig, private _store: Store) { }

    public async processConfiguration({ taskCreationPayload, taskCreationFormGroupValue }: { taskCreationPayload: ITaskCreationPayload, taskCreationFormGroupValue?: ITaskCreationFormGroupValue }) {
        const configureActivity = taskCreationPayload.configureActivity;
        if (!configureActivity || !taskCreationFormGroupValue) {
            return;
        }

        const code = taskCreationFormGroupValue.implementation ? taskCreationFormGroupValue.implementation.text : defaultImplementation;
        const methodEvaluation = CodemirrorRepository.evaluateCustomMethod(undefined, code);
        let outputParam: IParam | null = await selectSnapshot(this._store.select(selectIParam(taskCreationFormGroupValue.outputParamIdentifier)));
        if(!outputParam && methodEvaluation.status === MethodEvaluationStatus.ReturnValueFound) {
            const type = methodEvaluation.type == null || methodEvaluation.type === 'null'? 'undefined': methodEvaluation.type;
            outputParam = {
                identifier: taskCreationFormGroupValue.outputParamIdentifier!,
                _isIParam: true,
                constant: methodEvaluation.valueIsDefinite ?? false,
                name: taskCreationFormGroupValue.outputParamName ?? this._config.dynamicParamDefaultNaming,
                normalizedName: taskCreationFormGroupValue.normalizedOutputParamName ?? ProcessBuilderRepository.normalizeName(this._config.dynamicParamDefaultNaming),
                interface: taskCreationFormGroupValue.interface,
                type: type,
                defaultValue: methodEvaluation.detectedValue,
                typeDef: ProcessBuilderRepository.extractObjectTypeDefinition(methodEvaluation.detectedValue, true),
                nullable: false,
                optional: false
            };
        } 
        else if(methodEvaluation.status !== MethodEvaluationStatus.ReturnValueFound && typeof taskCreationFormGroupValue.functionOutputParamIdentifier === 'number') {
            this._store.dispatch(removeIParam(taskCreationFormGroupValue.functionOutputParamIdentifier));
            return;
        }

        if(!outputParam) {
            return;
        }
    
        const defaultValue = !Array.isArray(taskCreationFormGroupValue.outputParamValue) && taskCreationFormGroupValue.outputParamValue?.constant ? taskCreationFormGroupValue.outputParamValue.defaultValue : outputParam.defaultValue ?? await this._outputParamValue(methodEvaluation, taskCreationFormGroupValue.outputParamValue),
            outputParamName = taskCreationFormGroupValue.outputParamName ?? outputParam.name ?? this._config.dynamicParamDefaultNaming,
            normalizedOutputParamName = taskCreationFormGroupValue.normalizedOutputParamName ?? outputParam.normalizedName ?? ProcessBuilderRepository.normalizeName(taskCreationFormGroupValue.outputParamName ?? this._config.dynamicParamDefaultNaming),
            paramInterface = outputParam.interface ?? taskCreationFormGroupValue.interface ?? await this._outputParamInterface(methodEvaluation);

        let updatedOutputParam = {
            ...outputParam,
            name: outputParamName,
            normalizedName: normalizedOutputParamName,
            defaultValue: defaultValue,
            interface: paramInterface,
        } as IParam;

        if (!Array.isArray(taskCreationFormGroupValue.outputParamValue) && taskCreationFormGroupValue.outputParamValue?.type === 'array') {
            updatedOutputParam = {
                ...updatedOutputParam,
                interface: null,
                type: 'array',
                typeDef: [
                    {
                        interface: paramInterface ?? null,
                        type: 'object',
                    } as IParamDefinition
                ]
            };
        }

        if (typeof outputParam.interface === 'string') updatedOutputParam.type = 'object';
        else {
            const outputType = await this._methodEvaluationTypeToOutputType(configureActivity, methodEvaluation);
            updatedOutputParam.type = outputType;
        }

        this._store.dispatch(upsertIParam(updatedOutputParam));
    }

    private async _methodEvaluationTypeToOutputType(element: IElement, methodEvaluation?: IMethodEvaluationResult) {
        if (methodEvaluation?.injectorNavigationPath) {
            const inputParams = await firstValueFrom(this._store.select(selectIParams(BPMNJsRepository.getAvailableInputParams(element))).pipe(
                shareReplay(1),
                map(inputParams => inputParams ?? []),
                mapIParamsInterfaces(this._store)
            ));
            const currentPath = methodEvaluation.injectorNavigationPath.split('.');
            let currentIndex = 1;
            let param: IParam | IParamDefinition | undefined = inputParams.find(param => param.normalizedName === currentPath[0]);
            while (currentIndex < currentPath.length && param && Array.isArray(param.typeDef)) {
                param = param.typeDef.find(param => param.name === currentPath[currentIndex]);
                currentIndex++;
            }

            if (param) {
                return param.type;
            }

            throw ('error');
        }
        switch (methodEvaluation?.type) {
            case 'number':
                return 'number';

            case 'string':
                return 'string';

            case 'boolean':
                return 'boolean';

            case 'array':
                return 'array';
        }

        return 'object';
    }

    private async _outputParamInterface(methodEvaluation: IMethodEvaluationResult) {
        if (methodEvaluation.injectorNavigationPath) {
            const pathArray = methodEvaluation.injectorNavigationPath?.split('.');
            const inputParam = await firstValueFrom(this._store.select(selectIParams()).pipe(
                map(inputParams => {
                    const root = pathArray[0];
                    return (inputParams ?? []).find(inputParam => inputParam.normalizedName === root);
                }),
                mapIParamInterfaces(this._store)
            ));

            if (!inputParam) return;

            let currentIndex = 1;
            let currentMember = /^(.*).{0,1}\[(.*)\]/.exec(pathArray[currentIndex]);
            let currentMemberName = currentMember?.[1] ?? null;
            let currentTypeDef = (inputParam.typeDef as IParamDefinition[]).find(definition => definition.name === currentMemberName);

            while ((currentIndex + 1) < pathArray.length ?? 0) {
                if (/^.+\(.*\)$/.test(pathArray[currentIndex])) {
                    break;
                } else if (currentTypeDef?.type === 'array') {
                    if (typeof currentMember?.[2] === 'number') {
                        // array index
                    } else {
                        // array method/member call
                        const call = /^([a-zA-Z0-9]*).{0,1}\((.*)\)/.exec(pathArray.slice(currentIndex).join('.'));
                        const array: any = ProcessBuilderRepository.createPseudoObjectFromIParam(currentTypeDef);
                        const result = call![2] ? `${array[call![1]]}(${call![2]})` : array[call![1]];
                    }
                } else {
                    currentIndex++;
                    currentMember = /^(.*).{0,1}\[(.*)\]/.exec(pathArray[currentIndex]);
                    currentMemberName = currentMember?.[1] ?? null;
                    currentTypeDef = (inputParam.typeDef as IParamDefinition[]).find(definition => definition.name === currentMemberName);
                }
            }

            return currentTypeDef?.interface;
        }
    }

    private async _outputParamValue(methodEvaluation: IMethodEvaluationResult, defaultValue: object | null = null) {
        if (methodEvaluation.injectorNavigationPath) {
            const inputParam = await firstValueFrom(this._store.select(selectIParams()).pipe(
                map(inputParams => {
                    const root = methodEvaluation.injectorNavigationPath?.split('.')[0];
                    return (inputParams ?? []).find(inputParam => inputParam.normalizedName === root);
                }),
                mapIParamInterfaces(this._store)
            ));
            const object = ProcessBuilderRepository.createPseudoObjectFromIParam(inputParam);
            const injectedValue = deepObjectLookup(object, methodEvaluation.injectorNavigationPath);
            return injectedValue;
        }
        switch (methodEvaluation.type) {
            case 'number':
            case 'string':
            case 'object':
            case 'boolean':
            case 'array':
                return methodEvaluation.detectedValue;
        }

        return defaultValue;
    }
}