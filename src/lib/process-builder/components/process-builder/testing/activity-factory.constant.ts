import { IConnector } from "@/lib/bpmn-io/interfaces/connector.interface";
import { IExtensionElement } from "@/lib/bpmn-io/interfaces/extension-element.interface";
import shapeTypes from "@/lib/bpmn-io/shape-types";
import sebleichProcessBuilderExtension from "@/lib/process-builder/globals/sebleich-process-builder-extension";
import { IElement } from "@/lib/bpmn-io/interfaces/element.interface";

const createActivityExtension = (functionIdentifier: any) => {
    return {
        $instanceOf: (type) => {
            const prefix = sebleichProcessBuilderExtension.prefix;
            return type === `${prefix}:ActivityExtension`;
        },
        activityFunctionId: functionIdentifier
    } as IExtensionElement;
}


const ACTIVITY_FACTORY = (functionIdentifier: any) => {
    return {
        businessObject: {
            extensionElements:
            {
                values: [createActivityExtension(functionIdentifier)]
            }
        },
        incoming: [
            {
                type: shapeTypes.DataInputAssociation,
                source: {}
            } as IConnector,

        ],
        outgoing: []
    } as unknown as IElement
}

export default ACTIVITY_FACTORY;
