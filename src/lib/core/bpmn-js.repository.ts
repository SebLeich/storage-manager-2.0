import { Inject, Injectable } from "@angular/core";
import { ParamCodes } from "src/config/param-codes";
import { getElementRegistryModule, getModelingModule, getTooltipModule } from "../bpmn-io/bpmn-modules";
import { IElementRegistryModule } from '@bpmn-io/modules';
import { IBusinessObject } from "../bpmn-io/interfaces/business-object.interface";
import { IElement } from "../bpmn-io/interfaces/element.interface";
import shapeTypes from "../bpmn-io/shape-types";
import { IProcessValidationResult } from "../process-builder/interfaces/validation-result.interface";
import { IBpmnJS } from "../process-builder/interfaces/bpmn-js.interface";
import { IFunction, IParam } from "@process-builder/interfaces";
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from "../process-builder/interfaces/process-builder-config.interface";
import { sebleichProcessBuilderExtension } from "../process-builder/globals/sebleich-process-builder-extension";
import { ValidationError } from "../process-builder/globals/validation-error";
import { ValidationWarning } from "../process-builder/globals/validation-warning";
import { IExtensionElement } from "../bpmn-io/interfaces/extension-element.interface";
import { SebleichProcessBuilderExtensionType } from "../process-builder/globals/sebleich-process-builder-extension.type";
import { IConnector } from "../bpmn-io/interfaces/connector.interface";
import { GatewayType } from "../process-builder/types/gateway.type";

@Injectable()
export class BPMNJsRepository {

    constructor(@Inject(PROCESS_BUILDER_CONFIG_TOKEN) private _config: IProcessBuilderConfig) { }

    public static getActivityFunctionId = (activity: IElement) => BPMNJsRepository.getSLPBExtension(activity.businessObject, 'ActivityExtension', (ext) => ext.activityFunctionId) as number | undefined;
    public static getDataParamId = (activity: IElement) => BPMNJsRepository.getSLPBExtension(activity.businessObject, 'DataObjectExtension', (ext) => ext.dataParamId) as number | undefined;
    public static getSequenceFlowType = (activity: IConnector) => BPMNJsRepository.getSLPBExtension(activity.businessObject, 'SequenceFlowExtension', (ext) => ext.sequenceFlowType) as 'success' | 'error' | undefined;

    public static setActivityFunctionId = (bpmnJs: IBpmnJS, element: IElement, arg: number | IFunction | undefined | null) => BPMNJsRepository.updateBpmnElementSLPBExtension(bpmnJs, element.businessObject, 'ActivityExtension', (ext) => ext.activityFunctionId = typeof arg === 'number' ? arg : arg?.identifier);
    public static setDataParamId = (bpmnJs: IBpmnJS, element: IElement, arg: number | IParam | undefined | null) => BPMNJsRepository.updateBpmnElementSLPBExtension(bpmnJs, element.businessObject, 'DataObjectExtension', (ext) => ext.dataParamId = typeof arg === 'number' ? arg : arg?.identifier);
    public static setSequenceFlowType = (bpmnJs: IBpmnJS, connector: IConnector, entranceGatewayType: GatewayType) => BPMNJsRepository.updateBpmnElementSLPBExtension(bpmnJs, connector.businessObject, 'SequenceFlowExtension', (ext) => ext.sequenceFlowType = entranceGatewayType === 'Success' ? 'success' : 'error');

    public static appendOutputParam(bpmnJS: IBpmnJS, element: IElement, parameterIdentifier: number, parameterName: string, parameterInterface: string | null, parameterIsProcessOutput: boolean, preventDublet = true, expectedInterface?: string) {
        let dataOutputElement: IElement | undefined = element.outgoing.find(x => x.type === shapeTypes.DataOutputAssociation)?.target;

        if (!preventDublet || !dataOutputElement) {
            dataOutputElement = getModelingModule(bpmnJS).appendShape(element, {
                type: shapeTypes.DataObjectReference
            }, { x: element.x + 50, y: element.y - 60 });
        }

        BPMNJsRepository.setDataParamId(bpmnJS, dataOutputElement, parameterIdentifier);
        BPMNJsRepository.updateBpmnElementSLPBExtension(bpmnJS, dataOutputElement.businessObject, 'DataObjectExtension', (ext) => ext.matchesProcessOutputInterface = parameterInterface === expectedInterface);
        BPMNJsRepository.updateBpmnElementSLPBExtension(bpmnJS, dataOutputElement.businessObject, 'DataObjectExtension', (ext) => ext.isProcessOutput = parameterIsProcessOutput);

        const referencingDataRepresentations = getElementRegistryModule(bpmnJS).filter(element => element.type === shapeTypes.DataObjectReference && BPMNJsRepository.getDataParamId(element as IElement) === parameterIdentifier);
        for (const referencingDataRepresentation of referencingDataRepresentations) {
            getModelingModule(bpmnJS).updateLabel(referencingDataRepresentation, parameterName ?? 'no param name');
        }

        return { dataOutputElement };
    }

    public static clearAllTooltips(bpmnJS: IBpmnJS) {
        const tooltipModule = getTooltipModule(bpmnJS);
        Object.values(tooltipModule._tooltips).forEach(x => tooltipModule.remove(x));
    }

    public static fillAnchestors(element: IElement, anchestors: IElement[] = []) {
        let index = 0;
        if (!element || !Array.isArray(element.incoming) || element.incoming.length === 0) {
            return;
        }

        const notPassed = element.incoming.map(x => x.source).filter(x => anchestors.indexOf(x) === -1);
        while (index < notPassed.length) {
            const el = notPassed[index];
            anchestors.push(el);
            this.fillAnchestors(el, anchestors);
            index++;
        }
    }

    public static getAvailableInputParams(element: IElement | undefined) {
        if(!element) {
            return [];
        }

        const availableInputParamsIElements = this.getAvailableInputParamsIElements(element);
        const availableInputParams = availableInputParamsIElements.map((element) => BPMNJsRepository.getDataParamId(element)) as ParamCodes[];
        return availableInputParams;
    }

    public static getAvailableInputParamsIElements(element: IElement): IElement[] {
        const anchestors: IElement[] = [];
        this.fillAnchestors(element, anchestors);

        const precedingTasks = anchestors.filter((anchestor) => anchestor.type === shapeTypes.Task);
        const precedingTasksOutgoingConnectors = precedingTasks.flatMap((taskElement) => taskElement.outgoing);
        const precedingTasksOutgoingDataOutputAssociations = precedingTasksOutgoingConnectors.filter((outgoingConnector) => outgoingConnector.type === shapeTypes.DataOutputAssociation);
        const precedingDataObjectReferences = precedingTasksOutgoingDataOutputAssociations.map((outgoingDataOutputAssociation) => outgoingDataOutputAssociation.target);
        const precedingDataObjectReferencesWithParamId = precedingDataObjectReferences.filter((dataObjectReference) => typeof BPMNJsRepository.getDataParamId(dataObjectReference) === 'number');

        return precedingDataObjectReferencesWithParamId;
    }

    public static getExtensionElement(element: IBusinessObject, type: string): undefined | IExtensionElement {
        if (!element.extensionElements || !Array.isArray(element.extensionElements.values)) {
            return undefined;
        }

        const filteredExtensionElements = element.extensionElements.values.find((value: any) => value.$instanceOf(type));
        return filteredExtensionElements;
    }

    public static getNextNodes(currentNode: IElement | null | undefined): IElement[] {
        if (!currentNode) {
            return [];
        }

        return currentNode.outgoing.filter(x => x.type === shapeTypes.SequenceFlow).map(x => x.target);
    }

    public static getSLPBExtension<T>(businessObject: IBusinessObject | undefined, type: SebleichProcessBuilderExtensionType, provider: (extensions: any) => T) {
        if (!businessObject) {
            return undefined;
        }

        const prefix = sebleichProcessBuilderExtension.prefix;
        const extension = BPMNJsRepository.getExtensionElement(businessObject, `${prefix}:${type}`);
        return extension ? provider(extension) : undefined;
    }

    public static sLPBExtensionSetted(businessObject: IBusinessObject | undefined, type: SebleichProcessBuilderExtensionType, condition: (extensions: any) => boolean) {
        if (!businessObject) {
            return false;
        }

        const extension = BPMNJsRepository.getExtensionElement(businessObject, `${sebleichProcessBuilderExtension.prefix}:${type}`);
        const result = extension ? condition(extension) : false;
        return result;
    }

    public static updateBpmnElementSLPBExtension(bpmnJS: IBpmnJS, businessObject: IBusinessObject, type: SebleichProcessBuilderExtensionType, setter: (extension: any) => void) {
        let extensionElements = businessObject.extensionElements;
        if (!extensionElements) {
            extensionElements = bpmnJS._moddle.create('bpmn:ExtensionElements');
            businessObject.extensionElements = extensionElements;
        }

        let activityExtension = BPMNJsRepository.getExtensionElement(businessObject, `${sebleichProcessBuilderExtension.prefix}:${type}`);
        if (!activityExtension) {
            activityExtension = bpmnJS._moddle.create(`${sebleichProcessBuilderExtension.prefix}:${type}`);
            extensionElements.get('values').push(activityExtension);
        }

        setter(activityExtension as any);
    }

    public validateErrorGateway(bpmnJS: IBpmnJS, element: IElement, func: IFunction, gatewayName: string = this._config.errorGatewayConfig.gatewayName) {
        let gatewayShape: IElement | undefined = element.outgoing.find(sequenceFlow => sequenceFlow.type === shapeTypes.SequenceFlow && sequenceFlow.target?.type === shapeTypes.ExclusiveGateway)?.target;
        const modelingModule = getModelingModule(bpmnJS);
        if (func.canFail && !gatewayShape) {
            gatewayShape = modelingModule.appendShape(element, {
                type: shapeTypes.ExclusiveGateway
            }, { x: element.x + 200, y: element.y + 40 });
            modelingModule.updateLabel(gatewayShape, gatewayName);
        } else if (!func.canFail && gatewayShape) {
            modelingModule.removeElements([gatewayShape]);
        }
    }

    public static validateProcess(bpmnJS: IBpmnJS): IProcessValidationResult {
        const errors: { error: ValidationError, element?: IElement }[] = [], warnings: { warning: ValidationWarning, element?: IElement }[] = [];
        const elementRegistry = getElementRegistryModule(bpmnJS);

        const startEvents = this.getStartEvents(elementRegistry), endEvents = this.getEndEvents(elementRegistry);
        if (startEvents.length === 0) {
            errors.push({ error: ValidationError.NoStartEvent });
        }
        else if (startEvents.length > 1) {
            startEvents.forEach(x => errors.push({ error: ValidationError.MultipleStartEvents, element: x }));
        }

        const fullPath: IElement[] = [];
        for (const startEvent of startEvents) {

            if (startEvent.incoming.filter(x => x.type === shapeTypes.SequenceFlow).length > 0) {
                errors.push({ element: startEvent, error: ValidationError.StartEventWithIncomingSequenceFlow });
            }

            let cursor: IElement | null = startEvent, stack: IElement[] = [];
            const path: IElement[] = [];
            while (cursor) {

                const outputParams = cursor.outgoing.filter(x => x.type === shapeTypes.DataOutputAssociation).map(x => x.target);
                const unusedOutputParams = outputParams.filter(x => x.outgoing.filter(x => x.type === shapeTypes.DataInputAssociation).length === 0);
                unusedOutputParams.forEach(x => warnings.push({ 'element': x, 'warning': ValidationWarning.UnusedOutputParam }));

                const response: IElement[] = this.getNextNodes(cursor);
                path.push(cursor);

                if ((cursor.type !== shapeTypes.ExclusiveGateway || cursor.type !== shapeTypes.ExclusiveGateway) && response.length > 1) {
                    errors.push({ element: cursor, error: ValidationError.MultipleOutgoingSequenceFlowsFromNoneGatewayShape });
                }

                if (response.length === 0) {

                    if (cursor.type !== shapeTypes.EndEvent) errors.push({ error: ValidationError.SequenceEndWithoutEndEvent, element: cursor });

                } else {

                    stack = [...stack, ...response];

                }

                cursor = stack[0];
                stack.splice(0, 1);
                while (cursor && path.indexOf(cursor) > -1) {
                    warnings.push({ element: cursor, warning: ValidationWarning.CyclicAccess });
                    cursor = stack[0];
                }

            }

            fullPath.push(...path);

        }

        const unreachableElements = elementRegistry.getAll().filter(x => (x.type === shapeTypes.ExclusiveGateway || x.type === shapeTypes.ParallelGateway || x.type === shapeTypes.Task) && fullPath.indexOf(x) === -1);
        unreachableElements.forEach(x => warnings.push({ element: x, warning: ValidationWarning.UnreachableElement }));

        if (endEvents.length === 0) {
            warnings.push({ warning: ValidationWarning.NoEndEvent });
        }

        return { warnings: warnings, errors: errors };
    }

    public static getEndEvents(elementRegistry: IElementRegistryModule) {
        return elementRegistry.filter(x => x.type === shapeTypes.EndEvent);
    }

    public static getStartEvents(elementRegistry: IElementRegistryModule) {
        return elementRegistry.filter(x => x.type === shapeTypes.StartEvent) as IElement[];
    }

}
