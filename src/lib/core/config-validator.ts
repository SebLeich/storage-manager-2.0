import { Injector } from "@angular/core";
import { combineLatest, of, ReplaySubject, Subject, timer } from "rxjs";
import { buffer, debounceTime, filter, map, switchMap, take } from "rxjs/operators";
import bpmnJsEventTypes from "../bpmn-io/bpmn-js-event-types";
import bpmnJsModules from "../bpmn-io/bpmn-js-modules";
import { getDirectEditingModule, getElementRegistryModule, getModelingModule } from "../bpmn-io/bpmn-modules";
import { IConnectionCreatePostExecutedEvent } from "../bpmn-io/interfaces/connection-create-post-executed-event.interface";
import { IConnector } from "../bpmn-io/interfaces/connector.interface";
import { IElement } from "../bpmn-io/interfaces/element.interface";
import shapeTypes from "../bpmn-io/shape-types";
import defaultImplementation from "../process-builder/globals/default-implementation";
import { ErrorGatewayEvent } from "../process-builder/globals/error-gateway-event";
import { IFunction } from "../process-builder/globals/i-function";
import { IParam } from "../process-builder/globals/i-param";
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from "../process-builder/globals/i-process-builder-config";
import { ITaskCreationConfig } from "../process-builder/interfaces/i-task-creation-config.interface";
import { MethodEvaluationStatus } from "../process-builder/globals/method-evaluation-status";
import { TaskCreationStep } from "../process-builder/globals/task-creation-step";
import { DialogService } from "../process-builder/services/dialog.service";
import { addIFunction, updateIFunction } from "../process-builder/store/actions/i-function.actions";
import { removeIParam, upsertIParam } from "../process-builder/store/actions/i-param.actions";
import * as fromIFunctionSelector from "../process-builder/store/selectors/i-function.selector";
import * as fromIParmSelector from "../process-builder/store/selectors/i-param.selectors";
import { BPMNJsRepository } from "./bpmn-js.repository";
import { CodemirrorRepository } from "./codemirror-repository";
import { ProcessBuilderRepository } from "./process-builder-repository";
import { Store } from "@ngrx/store";
import { IDirectEditingEvent } from "../bpmn-io/interfaces/i-direct-editing-event.interface";
import { IShapeDeleteExecutedEvent } from "../bpmn-io/interfaces/i-shape-delete-executed-event.interface";
import { IEvent } from "../bpmn-io/interfaces/event.interface";
import { ITaskCreationPayload } from "../process-builder/interfaces/i-task-creation-payload.interface";
import { ITaskCreationData } from "../process-builder/interfaces/i-task-creation-data.interface";

/**
 * that method is deprecated and should be replaced
 * @param bpmnJS 
 * @param injector 
 * @returns 
 */
export const validateBPMNConfig = (bpmnJS: any, injector: Injector) => {

    let validationFinishedSubject = new Subject<void>();
    let tasks: any[] = [];
    let taskCreationSubject = new Subject<ITaskCreationConfig>();
    taskCreationSubject.pipe(
        buffer(taskCreationSubject.pipe(debounceTime(100))),
        filter(x => x.length > 0),
        switchMap((val: ITaskCreationConfig[]) => {
            let functionSelectionConfig = val.find(x => x.taskCreationStep === TaskCreationStep.ConfigureFunctionSelection);
            let functionIdentifier: null | number = BPMNJsRepository.getSLPBExtension<number>(functionSelectionConfig?.element?.businessObject, 'ActivityExtension', (ext) => ext.activityFunctionId) ?? null;
            let inputData: ITaskCreationPayload = {
                configureActivity: val.find(x => x.taskCreationStep === TaskCreationStep.ConfigureFunctionSelection)?.element,
                configureIncomingErrorGatewaySequenceFlow: val.find(x => x.taskCreationStep === TaskCreationStep.ConfigureErrorGatewayEntranceConnection)?.element
            }, initialValue = {
                functionIdentifier: functionIdentifier
            } as ITaskCreationData;
            return combineLatest([
                injector.get(DialogService).configTaskCreation({ taskCreationData: initialValue, taskCreationPayload: inputData }, bpmnJS),
                of(inputData)
            ]).pipe(take(1));
        }))
        .subscribe(([data, payload]: [ITaskCreationData, ITaskCreationPayload]) => handleTaskCreationComponentOutput(data, payload));

    let config: IProcessBuilderConfig = injector.get<IProcessBuilderConfig>(PROCESS_BUILDER_CONFIG_TOKEN);
    let _connectionCreatePostExecutedActions: { [key: string]: (evt: IConnectionCreatePostExecutedEvent) => void } = {};
    let _directEditingActivateActions: { [key: string]: (evt: IDirectEditingEvent) => void } = {};
    let _shapeAddedActions: { [key: string]: (evt: IEvent) => void } = {};
    let _shapeDeletePreExecuteActions: { [key: string]: (evt: IShapeDeleteExecutedEvent) => void } = {};

    _connectionCreatePostExecutedActions[shapeTypes.SequenceFlow] = (evt: IConnectionCreatePostExecutedEvent) => {
        tasks.push(evt);
        if (evt.context.source.type !== shapeTypes.ExclusiveGateway || !BPMNJsRepository.sLPBExtensionSetted(evt.context.source.businessObject, 'GatewayExtension', (ext) => ext.gatewayType === 'error_gateway')) return;
        if (!taskCreationSubject) taskCreationSubject = new ReplaySubject<ITaskCreationConfig>(1);
        taskCreationSubject.next({
            taskCreationStep: TaskCreationStep.ConfigureErrorGatewayEntranceConnection,
            element: evt.context.connection
        });
    }

    _directEditingActivateActions[shapeTypes.Task] = (evt: IDirectEditingEvent) => {
        tasks.push(evt);
        getDirectEditingModule(bpmnJS).cancel();
        if (!taskCreationSubject) taskCreationSubject = new ReplaySubject<ITaskCreationConfig>(1);
        taskCreationSubject.next({
            taskCreationStep: TaskCreationStep.ConfigureFunctionSelection,
            element: evt.active.element
        });
    }
    _directEditingActivateActions[shapeTypes.DataObjectReference] = (evt: IDirectEditingEvent) => {
        bpmnJS.get(bpmnJsModules.DirectEditing).cancel();
        let service: DialogService = injector.get(DialogService);
        const store = injector.get(Store);
        let outputParam = BPMNJsRepository.getSLPBExtension(evt.active.element.businessObject, 'DataObjectExtension', (ext) => ext.outputParam);
        service.editParam(outputParam, evt.active.element).pipe(
            switchMap(() => store.select(fromIParmSelector.selectIParam(outputParam))),
            take(1)
        ).subscribe((param: IParam | null | undefined) => {
            if (!param) return;
            getModelingModule(bpmnJS).updateLabel(evt.active.element, param.name);
        });
    }
    _directEditingActivateActions[shapeTypes.Label] = (evt: IDirectEditingEvent) => {
        if (typeof _directEditingActivateActions[evt.active.element.businessObject.$type] === 'undefined') {
            return;
        }
        let element = getElementRegistryModule(bpmnJS).get(evt.active.element.businessObject.id);
        _directEditingActivateActions[evt.active.element.businessObject.$type]({ 'active': { 'element': element } } as any);
    }

    _shapeAddedActions[shapeTypes.StartEvent] = (evt: IEvent) => {
        if (!!config?.statusConfig) {
            getModelingModule(bpmnJS).updateLabel(evt.element, config.statusConfig.initialStatus);
            validationFinishedSubject.next();
        }
    }
    _shapeAddedActions[shapeTypes.EndEvent] = (evt: IEvent) => {
        getModelingModule(bpmnJS).updateLabel(evt.element, config.statusConfig.finalStatus);
        validationFinishedSubject.next();
    }

    _shapeDeletePreExecuteActions[shapeTypes.Task] = (evt: IShapeDeleteExecutedEvent) => {
        let removeElements = evt.context.shape.outgoing.filter(x => x.type === shapeTypes.DataOutputAssociation || (x.type === shapeTypes.SequenceFlow && BPMNJsRepository.sLPBExtensionSetted(x.target.businessObject, 'GatewayExtension', (ext) => ext.gatewayType === 'error_gateway')));
        getModelingModule(bpmnJS).removeElements(removeElements.map(x => x.target));
    }

    _shapeDeletePreExecuteActions[shapeTypes.EndEvent] = (evt: IShapeDeleteExecutedEvent) => {
        let incomingFunctionMap = evt.context.shape.incoming.map(x => {
            return {
                element: x.source,
                activityFunctionId: BPMNJsRepository.getSLPBExtension(x.source.businessObject, 'ActivityExtension', (ext) => ext.activityFunctionId)
            }
        }).filter(x => typeof x.activityFunctionId === 'number');

        let store = injector.get(Store), modelingModule = getModelingModule(bpmnJS);
        store.select(fromIFunctionSelector.selectIFunctions(incomingFunctionMap.map(x => x.activityFunctionId))).pipe(take(1), map(funcs => funcs.filter(func => func.finalizesFlow))).subscribe(finalizingFuncs => {
            let elements = incomingFunctionMap.filter(entry => finalizingFuncs.findIndex(x => x.identifier === entry.activityFunctionId) > -1).map(entry => entry.element);
            modelingModule.removeElements(elements);
        });
    }

    bpmnJS.get(bpmnJsModules.EventBus).on(bpmnJsEventTypes.ShapeAdded, (evt: IEvent) => {
        if (typeof _shapeAddedActions[evt.element.type] === 'undefined') return;
        timer(1).subscribe(() => _shapeAddedActions[evt.element.type](evt));
    });

    bpmnJS.get(bpmnJsModules.EventBus).on(bpmnJsEventTypes.DirectEditingActivate, (evt: IDirectEditingEvent) => {
        if (typeof _directEditingActivateActions[evt.active.element.type] === 'undefined') return;
        timer(1).subscribe(() => _directEditingActivateActions[evt.active.element.type](evt));
    });

    bpmnJS.get(bpmnJsModules.EventBus).on(bpmnJsEventTypes.CommandStackShapeDeletePreExecute, (evt: IShapeDeleteExecutedEvent) => {
        if (typeof _shapeDeletePreExecuteActions[evt.context.shape.type] === 'undefined') {
            return;
        }
        _shapeDeletePreExecuteActions[evt.context.shape.type](evt);
    });

    bpmnJS.get(bpmnJsModules.EventBus).on(bpmnJsEventTypes.CommandStackConnectionCreatePostExecuted, (evt: IConnectionCreatePostExecutedEvent) => {
        if (typeof _connectionCreatePostExecutedActions[evt.context.connection.type] === 'undefined') return;
        _connectionCreatePostExecutedActions[evt.context.connection.type](evt);
    });

    const handleTaskCreationComponentOutput = (taskCreationComponentOutput: ITaskCreationData, payload: ITaskCreationPayload): void => {

        if (!taskCreationComponentOutput) {
            if (!payload.configureActivity || typeof BPMNJsRepository.getSLPBExtension(payload.configureActivity.businessObject, 'ActivityExtension', (ext) => ext.activityFunctionId) !== 'number') getModelingModule(bpmnJS).removeElements([payload.configureActivity!]);
            return;
        }

        const config = injector.get(PROCESS_BUILDER_CONFIG_TOKEN),
            modelingModule = getModelingModule(bpmnJS),
            store = injector.get(Store);

        if (typeof taskCreationComponentOutput.entranceGatewayType === 'number') {
            let connector: IConnector | null = payload.configureIncomingErrorGatewaySequenceFlow ?? null;
            if (connector) modelingModule.updateLabel(connector, taskCreationComponentOutput.entranceGatewayType === ErrorGatewayEvent.Success ? config.errorGatewayConfig.successConnectionName : config.errorGatewayConfig.errorConnectionName);
        }

        const inputParams: { varName: string, propertyName: string | null }[] = taskCreationComponentOutput.implementation ? CodemirrorRepository.getUsedInputParams(undefined, taskCreationComponentOutput.implementation) : [];
        combineLatest([
            store.select(fromIFunctionSelector.selectIFunction(taskCreationComponentOutput.functionIdentifier)),
            store.select(fromIParmSelector.selectNextId()),
            store.select(fromIFunctionSelector.selectNextId()),
            store.select(fromIParmSelector.selectIParamsByNormalizedName(inputParams.filter(x => x.varName === 'injector' && typeof x.propertyName === 'string').map(x => x.propertyName!)))
        ])
            .pipe(
                take(1),
                switchMap(([func, paramId, funcId, usedInputParams]: [(IFunction | undefined | null), number, number, IParam[]]) => {
                    return combineLatest([of(func), of(paramId), of(funcId), of(usedInputParams), store.select(fromIParmSelector.selectIParam(func?.output?.param))]);
                }),
                take(1)
            )
            .subscribe(([func, paramId, funcId, usedInputParams, outputParam]: [(IFunction | undefined | null), number, number, IParam[], IParam | 'dynamic' | undefined | null]) => {

                if (!func) {

                    if (payload.configureActivity && typeof BPMNJsRepository.getSLPBExtension(payload.configureActivity.businessObject, 'ActivityExtension', (ext) => ext.activityFunctionId) !== 'number') {
                        getModelingModule(bpmnJS).removeElements([payload.configureActivity]);
                    }
                    return;

                }

                let type = typeof func.output?.param;
                let f: IFunction = func!, outputParamId: number = type === 'number' ? func.output?.param as number : paramId;
                if (func.requireCustomImplementation || func.customImplementation || func.useDynamicInputParams || func.output!.param === 'dynamic') {

                    let methodEvaluation = CodemirrorRepository.evaluateCustomMethod(undefined, taskCreationComponentOutput.implementation ?? defaultImplementation);
                    if (methodEvaluation.status === MethodEvaluationStatus.ReturnValueFound || func.output?.param === 'dynamic') {

                        outputParam = {
                            identifier: outputParamId,
                            name: taskCreationComponentOutput.outputParamName ?? config.dynamicParamDefaultNaming,
                            normalizedName: taskCreationComponentOutput.normalizedOutputParamName ?? ProcessBuilderRepository.normalizeName(taskCreationComponentOutput.outputParamName ?? config.dynamicParamDefaultNaming),
                            defaultValue: taskCreationComponentOutput.outputParamValue ?? [],
                            type: 'object'
                        } as IParam;
                        store.dispatch(upsertIParam(outputParam));

                    } else if (outputParam && outputParam !== 'dynamic') {
                        let elements = payload.configureActivity?.outgoing.filter(x => x.type === shapeTypes.DataOutputAssociation && BPMNJsRepository.sLPBExtensionSetted(x.target.businessObject, 'DataObjectExtension', (ext) => ext.outputParam === (outputParam as IParam).identifier)).map(x => x.target);
                        if (Array.isArray(elements)) modelingModule.removeElements(elements);
                        store.dispatch(removeIParam(outputParam));
                        outputParam = undefined;
                    }

                    let inputParams: { optional: boolean, param: number }[] = [];
                    if (func.useDynamicInputParams && typeof taskCreationComponentOutput.inputParam === 'number') inputParams.push({ optional: false, param: taskCreationComponentOutput.inputParam });
                    else if (func.requireCustomImplementation || func.customImplementation) {
                        inputParams.push(...usedInputParams.map(x => {
                            return { 'optional': false, 'param': x.identifier }
                        }));
                    }

                    f = {
                        'customImplementation': taskCreationComponentOutput.implementation ?? undefined,
                        'canFail': taskCreationComponentOutput.canFail ?? false,
                        'name': taskCreationComponentOutput.name ?? config.defaultFunctionName,
                        'identifier': func.requireCustomImplementation ? funcId : func.identifier,
                        'normalizedName': taskCreationComponentOutput.normalizedName ?? ProcessBuilderRepository.normalizeName(taskCreationComponentOutput.name ?? undefined),
                        'output': methodEvaluation.status === MethodEvaluationStatus.ReturnValueFound || func.output?.param === 'dynamic' ? { param: outputParamId } : null,
                        'pseudoImplementation': func.pseudoImplementation,
                        'inputParams': inputParams,
                        'requireCustomImplementation': false,
                        'requireDynamicInput': false,
                        'useDynamicInputParams': func.useDynamicInputParams
                    };

                    func.requireCustomImplementation || func.requireDynamicInput || func.output?.param === 'dynamic' ? store.dispatch(addIFunction(f)) : store.dispatch(updateIFunction(f));

                }

                if (func.finalizesFlow) {

                    modelingModule.appendShape(payload.configureActivity!, { type: shapeTypes.EndEvent }, {
                        x: payload.configureActivity!.x + 200,
                        y: payload.configureActivity!.y + 40
                    });

                }

                if (payload.configureActivity) {

                    BPMNJsRepository.updateBpmnElementSLPBExtension(bpmnJS, payload.configureActivity.businessObject, 'ActivityExtension', (e: any) => e.activityFunctionId = f.identifier);
                    getModelingModule(bpmnJS).updateLabel(payload.configureActivity, f.name);

                    if (outputParam && outputParam !== 'dynamic') BPMNJsRepository.appendOutputParam(bpmnJS, payload.configureActivity!, outputParam, true, config.expectInterface);
                    else modelingModule.removeElements(payload.configureActivity.outgoing.filter(x => x.type === shapeTypes.DataOutputAssociation).map(x => x.target));

                    var gatewayShape = payload.configureActivity.outgoing.find(x => x.type === shapeTypes.SequenceFlow && BPMNJsRepository.sLPBExtensionSetted(x.target?.businessObject, 'GatewayExtension', (ext) => ext.gatewayType === 'error_gateway'))?.target;
                    if (f.canFail && !gatewayShape) {

                        // remove outgoing sequence flows
                        let outgoingSequenceFlows = payload.configureActivity.outgoing.filter(x => x.type === shapeTypes.SequenceFlow);
                        let formerConnectedTargets = outgoingSequenceFlows.map(x => x.target);
                        modelingModule.removeElements(outgoingSequenceFlows);

                        gatewayShape = modelingModule.appendShape(payload.configureActivity, {
                            type: shapeTypes.ExclusiveGateway
                        }, { x: payload.configureActivity.x + 200, y: payload.configureActivity.y + 40 });

                        BPMNJsRepository.updateBpmnElementSLPBExtension(bpmnJS, gatewayShape!.businessObject, 'GatewayExtension', (e: any) => e.gatewayType = 'error_gateway');

                        modelingModule.updateLabel(gatewayShape, config.errorGatewayConfig.gatewayName);

                        // reconnect the former connected targets
                        for (let formerConnectedTarget of formerConnectedTargets) {
                            modelingModule.connect(gatewayShape, formerConnectedTarget);
                        }

                    } else if (!f.canFail && gatewayShape) modelingModule.removeElements([gatewayShape]);

                    modelingModule.removeElements(payload.configureActivity.incoming.filter(x => x.type === shapeTypes.DataInputAssociation));
                    if (f.inputParams || func.useDynamicInputParams) {
                        let inputParams = f.inputParams ? Array.isArray(f.inputParams) ? [...f.inputParams] : [f.inputParams] : [];
                        if (typeof taskCreationComponentOutput.inputParam === 'number') inputParams.push({ optional: false, param: taskCreationComponentOutput.inputParam });

                        let availableInputParamsIElements = BPMNJsRepository.getAvailableInputParamsIElements(payload.configureActivity);
                        for (let param of inputParams.filter(x => !(payload.configureActivity as IElement).incoming.some(y => BPMNJsRepository.sLPBExtensionSetted(y.source.businessObject, 'DataObjectExtension', (ext) => ext.outputParam === x.param)))) {
                            let element = availableInputParamsIElements.find(x => BPMNJsRepository.sLPBExtensionSetted(x.businessObject, 'DataObjectExtension', (ext) => ext.outputParam === param.param));
                            if (!element) continue;
                            modelingModule.connect(element, payload.configureActivity);
                        }
                    }

                    validationFinishedSubject.next();
                }

            });

    }

    return validationFinishedSubject.asObservable();

}
