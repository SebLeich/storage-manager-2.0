import { IConnector } from "@/lib/bpmn-io/interfaces/connector.interface";
import { IExtensionElement } from "@/lib/bpmn-io/interfaces/extension-element.interface";
import shapeTypes from "@/lib/bpmn-io/shape-types";
import sebleichProcessBuilderExtension from "@/lib/process-builder/globals/sebleich-process-builder-extension";
import { IElement } from "@/lib/bpmn-io/interfaces/element.interface";

const createDataObjectExtension = (dataParamIdentifier: string | number | undefined) => {
    return {
        $instanceOf: (type) => {
            const prefix = sebleichProcessBuilderExtension.prefix;
            return type === `${prefix}:DataObjectExtension`;
        },
        dataParamId: dataParamIdentifier
    } as IExtensionElement;
}


const DATA_OBJECT_FACTORY = (dataParamIdentifier: string | number | undefined) => {
    return {
        businessObject: {
            extensionElements:
            {
                values: [createDataObjectExtension(dataParamIdentifier)]
            }
        },
        incoming: [
            {
                type: shapeTypes.DataObjectReference,
                source: {}
            } as IConnector,

        ],
        outgoing: []
    } as unknown as IElement
}

export default DATA_OBJECT_FACTORY;
