import { Inject, Injectable } from "@angular/core";
import { ParamCodes } from "src/config/param-codes";
import { getElementRegistryModule, getModelingModule } from "../bpmn-io/bpmn-modules";
import { IBusinessObject } from "../bpmn-io/i-business-object";
import { IElement } from "../bpmn-io/i-element";
import shapeTypes from "../bpmn-io/shape-types";
import { IProcessValidationResult } from "../process-builder/classes/validation-result";
import { IBpmnJS } from "../process-builder/globals/i-bpmn-js";
import { IFunction } from "../process-builder/globals/i-function";
import { IParam } from "../process-builder/globals/i-param";
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from "../process-builder/globals/i-process-builder-config";
import sebleichProcessBuilderExtension from "../process-builder/globals/sebleich-process-builder-extension";
import { ValidationError } from "../process-builder/globals/validation-error";
import { ValidationWarning } from "../process-builder/globals/validation-warning";

@Injectable({ providedIn: 'root' })
export class BPMNJsRepository {

    constructor(@Inject(PROCESS_BUILDER_CONFIG_TOKEN) private _config: IProcessBuilderConfig) {

    }

    static appendOutputParam(bpmnJS: any, element: IElement, param: IParam | null | undefined, preventDublet: boolean = true): null | IElement {
        if (!param) return null;
        let e = element.outgoing.find(x => x.type === shapeTypes.DataOutputAssociation)?.target;
        if (!preventDublet || !e) {
            e = getModelingModule(bpmnJS).appendShape(element, {
                type: shapeTypes.DataObjectReference
            }, { x: element.x + 50, y: element.y - 60 });
            BPMNJsRepository.updateBpmnElementSLPBExtension(bpmnJS, e.businessObject, 'DataObjectExtension', (ext) => {
                ext.outputParam = param.identifier;
            });
        } else if (e) {
            BPMNJsRepository.updateBpmnElementSLPBExtension(bpmnJS, e.businessObject, 'DataObjectExtension', (ext) => {
                ext.outputParam = param.identifier;
            });
        };
        getModelingModule(bpmnJS).updateLabel(e, param.name);
        return e;
    }

    static fillAnchestors(element: IElement, anchestors: IElement[] = []) {
        let index = 0;
        if (!element || !Array.isArray(element.incoming) || element.incoming.length === 0) return;
        let notPassed = element.incoming.map(x => x.source).filter(x => anchestors.indexOf(x) === -1);
        while (index < notPassed.length) {
            let el = notPassed[index];
            anchestors.push(el);
            this.fillAnchestors(el, anchestors);
            index++;
        }
    }

    static getAvailableInputParams(element: IElement) {
        return this.getAvailableInputParamsIElements(element).map(x => BPMNJsRepository.getSLPBExtension(x.businessObject, 'DataObjectExtension', (ext) => ext.outputParam)) as ParamCodes[];
    }

    static getAvailableInputParamsIElements(element: IElement) {
        let anchestors: IElement[] = [];
        this.fillAnchestors(element, anchestors);
        let tasks = anchestors.filter(x => x.type === shapeTypes.Task);
        let outputParams = tasks.flatMap(x => x.outgoing).filter(x => x.type === shapeTypes.DataOutputAssociation).map(x => x.target);
        return outputParams.filter(x => BPMNJsRepository.sLPBExtensionSetted(x.businessObject, 'DataObjectExtension', (ext) => 'outputParam' in ext)) as IElement[];
    }

    static getExtensionElements(element: IBusinessObject, type: string): undefined | any[] {
        if (!element.extensionElements || !Array.isArray(element.extensionElements.values)) return undefined;
        return element.extensionElements.values.filter((x: any) => x.$instanceOf(type))[0];
    }

    static getNextNodes(currentNode: IElement | null | undefined): IElement[] {
        if (!currentNode) return [];
        return currentNode.outgoing.filter(x => x.type === shapeTypes.SequenceFlow).map(x => x.target);
    }

    static getSLPBExtension<T>(businessObject: IBusinessObject | undefined, type: 'ActivityExtension' | 'GatewayExtension' | 'DataObjectExtension', provider: (extensions: any) => T) {
        if (!businessObject) return undefined;
        let extension = BPMNJsRepository.getExtensionElements(businessObject, `${sebleichProcessBuilderExtension.prefix}:${type}`);
        return extension ? provider(extension) : undefined;
    }

    static sLPBExtensionSetted(businessObject: IBusinessObject | undefined, type: 'ActivityExtension' | 'GatewayExtension' | 'DataObjectExtension', condition: (extensions: any) => boolean) {
        if (!businessObject) return false;
        let extension = BPMNJsRepository.getExtensionElements(businessObject, `${sebleichProcessBuilderExtension.prefix}:${type}`);
        return extension ? condition(extension) : false;
    }

    static updateBpmnElementSLPBExtension(bpmnJS: IBpmnJS, businessObject: IBusinessObject, type: 'ActivityExtension' | 'GatewayExtension' | 'DataObjectExtension', setter: (extension: any) => void) {
        let extensionElements = businessObject.extensionElements;
        if (!extensionElements) {
            extensionElements = bpmnJS._moddle.create('bpmn:ExtensionElements');
            businessObject.extensionElements = extensionElements;
        }

        let activityExtension = BPMNJsRepository.getExtensionElements(businessObject, `${sebleichProcessBuilderExtension.prefix}:${type}`);
        if (!activityExtension) {
            activityExtension = bpmnJS._moddle.create(`${sebleichProcessBuilderExtension.prefix}:${type}`);
            extensionElements.get('values').push(activityExtension);
        }

        setter(activityExtension as any);
    }

    validateErrorGateway(bpmnJS: IBpmnJS, element: IElement, func: IFunction, gatewayName: string = this._config.errorGatewayConfig.gatewayName) {
        var gatewayShape: IElement | undefined = element.outgoing.find(x => x.type === shapeTypes.SequenceFlow && BPMNJsRepository.sLPBExtensionSetted(x.businessObject, 'GatewayExtension', (ext) => ext.gatewayType === 'error_gateway'))?.target, modelingModule = getModelingModule(bpmnJS);
        if (func.canFail && !gatewayShape) {
            gatewayShape = modelingModule.appendShape(element, {
                type: shapeTypes.ExclusiveGateway
            }, { x: element.x + 200, y: element.y + 40 });
            BPMNJsRepository.updateBpmnElementSLPBExtension(bpmnJS, element.businessObject, 'GatewayExtension', (ext) => ext.gatewayType = 'error_gateway');
            modelingModule.updateLabel(gatewayShape, gatewayName);
        } else if (!func.canFail && gatewayShape) {
            modelingModule.removeElements([gatewayShape]);
        }
    }

    static validateProcess(bpmnJS: IBpmnJS): IProcessValidationResult {
        let errors: { error: ValidationError, element?: IElement }[] = [], warnings: { warning: ValidationWarning, element?: IElement }[] = [];
        let elementRegistry = getElementRegistryModule(bpmnJS);

        let startEvents = elementRegistry.filter(x => x.type === shapeTypes.StartEvent), endEvents = elementRegistry.filter(x => x.type === shapeTypes.EndEvent);
        if (startEvents.length === 0) errors.push({ error: ValidationError.NoStartEvent });
        else if (startEvents.length > 1) startEvents.forEach(x => errors.push({ error: ValidationError.MultipleStartEvents, element: x }));

        for (let startEvent of startEvents) {

            if (startEvent.incoming.filter(x => x.type === shapeTypes.SequenceFlow).length > 0) {
                errors.push({ element: startEvent, error: ValidationError.StartEventWithIncomingSequenceFlow });
            }

            let cursor: IElement | null = startEvent, stack: IElement[] = [], path: IElement[] = [];
            while (cursor) {

                let response: IElement[] = this.getNextNodes(cursor);
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

        }

        if (endEvents.length === 0) {
            warnings.push({ warning: ValidationWarning.NoEndEvent });
        }

        return { warnings: warnings, errors: errors };
    }

}
