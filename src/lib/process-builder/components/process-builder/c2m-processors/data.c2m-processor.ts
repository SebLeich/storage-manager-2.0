import { ITaskCreationFormGroupValue } from "@/lib/process-builder/interfaces/task-creation-form-group-value.interface";
import { ITaskCreationPayload } from "@/lib/process-builder/interfaces/task-creation-payload.interface";
import { IC2MProcessor } from "../interfaces/c2m-processor.interface";
import { BPMNJsRepository } from "@/lib/core/bpmn-js.repository";
import { BpmnJsService } from "@/lib/process-builder/services/bpmn-js.service";
import { Inject, Injectable } from "@angular/core";
import { BPMN_JS } from "@/lib/process-builder/injection-token";
import { IBpmnJS, IFunction, IInterface, IMethodEvaluationResult, IParam, IParamDefinition, IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from "@/lib/process-builder/interfaces";
import { Store } from "@ngrx/store";
import { CodemirrorRepository } from "@/lib/core/codemirror.repository";
import { MethodEvaluationStatus } from "@/lib/process-builder/globals/method-evaluation-status";
import defaultImplementation from "@/lib/process-builder/globals/default-implementation";
import { ProcessBuilderRepository } from "@/lib/core/process-builder-repository";
import { firstValueFrom, map, shareReplay } from "rxjs";
import { selectIFunction, selectIInterface, selectIParam, selectIParams, selectNextParameterIdentifier } from "@/lib/process-builder/store/selectors";
import { mapIParamInterfaces } from "@/lib/process-builder/extensions/rxjs/map-param-interfaces.rxjs";
import shapeTypes from "@/lib/bpmn-io/shape-types";
import { upsertIParam } from "@/lib/process-builder/store";
import { IElement } from "@/lib/bpmn-io/interfaces/element.interface";
import { mapIParamsInterfaces } from "@/lib/process-builder/extensions/rxjs/map-params-interfaces.rxjs";
import { deepObjectLookup } from "@/lib/shared/globals/deep-object-lookup.function";
import { selectSnapshot } from "@/lib/process-builder/globals/select-snapshot";

@Injectable()
export class DataC2MProcessor implements IC2MProcessor {

    constructor(@Inject(BPMN_JS) private _bpmnJs: IBpmnJS, @Inject(PROCESS_BUILDER_CONFIG_TOKEN) private _config: IProcessBuilderConfig, private _bpmnJsService: BpmnJsService, private _store: Store) { }

    public async processConfiguration({ taskCreationPayload, taskCreationFormGroupValue }: { taskCreationPayload: ITaskCreationPayload, taskCreationFormGroupValue?: ITaskCreationFormGroupValue }) {
        const configureActivity = taskCreationPayload.configureActivity;
        if (!configureActivity || !taskCreationFormGroupValue) {
            return;
        }

        const updatedFunction = await selectSnapshot(this._store.select(selectIFunction(taskCreationFormGroupValue?.functionIdentifier)));
        if (!updatedFunction) {
            return;
        }

        // HEREEE
        const output = this._getFunctionOutput(updatedFunction);
        const code = taskCreationFormGroupValue.implementation ? taskCreationFormGroupValue.implementation.text : defaultImplementation;
        const methodEvaluation = CodemirrorRepository.evaluateCustomMethod(undefined, code),
            nextParamId = await selectSnapshot(this._store.select(selectNextParameterIdentifier()));

        if (typeof updatedFunction.output === 'number' || methodEvaluation.status === MethodEvaluationStatus.ReturnValueFound) {
            const param = await selectSnapshot(this._store.select(selectIParam(updatedFunction.output))) ?? { identifier: nextParamId } as IParam;

            await this._handleFunctionOutputParam(taskCreationFormGroupValue, taskCreationPayload, param, methodEvaluation);
        }
        else if (typeof updatedFunction.outputTemplate === 'string') {
            const iFace = await selectSnapshot(this._store.select(selectIInterface(updatedFunction.outputTemplate)));
            const param = { identifier: nextParamId, interface: iFace?.identifier, name: taskCreationFormGroupValue.outputParamName ?? iFace?.name, normalizedName: taskCreationFormGroupValue.normalizedOutputParamName ?? iFace?.normalizedName } as IParam;

            await this._handleFunctionOutputParam(taskCreationFormGroupValue, taskCreationPayload, param, methodEvaluation);
        }
        else {
            const dataOutputAssociations = configureActivity.outgoing.filter(x => x.type === shapeTypes.DataOutputAssociation);
            this._bpmnJsService.modelingModule.removeElements(dataOutputAssociations.map(dataOutputAssociation => dataOutputAssociation.target));
        }

        this._handleDataInputConfiguration(taskCreationFormGroupValue, taskCreationPayload, updatedFunction);
    }

    private async _getFunctionOutput(updatedFunction: IFunction) {
        let outputTemplate: IInterface | null = null,
            outputParam: IParam | null = null;

        if (updatedFunction._isImplementation) {
            
            outputParam = await selectSnapshot(this._store.select(selectIParam(updatedFunction.output)));
        }
        else {
            outputTemplate = await selectSnapshot(this._store.select(selectIInterface(updatedFunction.outputTemplate)));
        }

        return { outputTemplate, outputParam };
    }

    private _handleDataInputConfiguration(taskCreationFormGroupValue: ITaskCreationFormGroupValue, taskCreationPayload: ITaskCreationPayload, resultingFunction: IFunction) {
        const configureActivity = taskCreationPayload.configureActivity;
        if (configureActivity) {
            const dataInputAssociations = configureActivity.incoming.filter(incoming => incoming.type === shapeTypes.DataInputAssociation);
            if (dataInputAssociations.length > 0) {
                this._bpmnJsService.modelingModule.removeElements(dataInputAssociations);
            }
        }

        if (resultingFunction.inputTemplates || resultingFunction.inputTemplates === 'dynamic') {
            const inputParams = Array.isArray(resultingFunction.inputTemplates) ? [...resultingFunction.inputTemplates] : [];
            if (typeof taskCreationFormGroupValue.inputParam === 'number') {
                inputParams.push({ optional: false, interface: taskCreationFormGroupValue.interface ?? undefined, name: 'my input', type: 'string' });
            }

            if (configureActivity) {
                const availableInputParamsIElements = BPMNJsRepository.getAvailableInputParamsIElements(configureActivity);
                for (const param of inputParams.filter((inputParam) => !(taskCreationPayload.configureActivity as IElement).incoming.some((connector) => BPMNJsRepository.getDataParamId(connector.source) === (inputParam as IParam).identifier))) {
                    const element = availableInputParamsIElements.find((element) => BPMNJsRepository.getDataParamId(element) === (param as IParam).identifier);
                    if (element) {
                        this._bpmnJsService.modelingModule.connect(element, configureActivity);
                    }
                }
            }
        }
    }

    private async _handleFunctionOutputParam(taskCreationFormGroupValue: ITaskCreationFormGroupValue, taskCreationPayload: ITaskCreationPayload, outputParam: IParam, methodEvaluation: IMethodEvaluationResult) {
        const paramInterface = outputParam.interface ?? taskCreationFormGroupValue.interface ?? await this._outputParamInterface(methodEvaluation);
        const defaultValue = !Array.isArray(taskCreationFormGroupValue.outputParamValue) && taskCreationFormGroupValue.outputParamValue?.constant ? taskCreationFormGroupValue.outputParamValue.defaultValue : outputParam.defaultValue ?? await this._outputParamValue(methodEvaluation, taskCreationFormGroupValue.outputParamValue);
        outputParam = {
            ...outputParam,
            name: taskCreationFormGroupValue.outputParamName ?? outputParam.name ?? this._config.dynamicParamDefaultNaming,
            normalizedName: taskCreationFormGroupValue.normalizedOutputParamName ?? outputParam.normalizedName ?? ProcessBuilderRepository.normalizeName(taskCreationFormGroupValue.outputParamName ?? this._config.dynamicParamDefaultNaming),
            defaultValue: defaultValue,
            interface: paramInterface,
        } as IParam;
        if (!Array.isArray(taskCreationFormGroupValue.outputParamValue) && taskCreationFormGroupValue.outputParamValue?.type === 'array') {
            outputParam.interface = null;
            outputParam.type = 'array';
            outputParam.typeDef = [
                {
                    interface: paramInterface ?? null,
                    type: 'object',
                } as IParamDefinition
            ]
        }
        if (typeof outputParam.interface === 'string') {
            outputParam.type = 'object';
        } else {
            const outputType = await this._methodEvaluationTypeToOutputType(taskCreationPayload.configureActivity!, methodEvaluation);
            outputParam.type = outputType;
        }

        this._store.dispatch(upsertIParam(outputParam));

        BPMNJsRepository.appendOutputParam(
            this._bpmnJs,
            taskCreationPayload.configureActivity!,
            outputParam,
            true,
            this._config.expectInterface
        );

        return { outputParam }
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