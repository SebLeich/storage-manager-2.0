export const sebleichProcessBuilderExtension = {
    "name": "process builder extension",
    "uri": "https://www.sebleich.com/schema/xml/process-builder-extension",
    "prefix": "slpb",
    "xml": {
        "tagAlias": "lowerCase"
    },
    "types": [
        {
            "name": "ActivityExtension",
            "superClass": ["Element"],
            "properties": [
                {
                    "name": "activityFunctionId",
                    "isAttr": true,
                    "type": "Integer"
                }
            ]
        }, {
            "name": "GatewayExtension",
            "superClass": ["Element"],
            "properties": [
                {
                    "name": "gatewayType",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        }, {
            "name": "SequenceFlowExtension",
            "superClass": ["Element"],
            "properties": [
                {
                    "name": "sequenceFlowType",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        }, {
            "name": "DataObjectExtension",
            "superClass": ["Element"],
            "properties": [
                {
                    "name": "outputParam",
                    "isAttr": true,
                    "type": "Integer"
                }, {
                    "name": "matchesProcessOutputInterface",
                    "isAttr": true,
                    "type": "Boolean"
                }, {
                    "name": "isProcessOutput",
                    "isAttr": true,
                    "type": "Boolean"
                }
            ]
        }
    ],
    "emumerations": [],
    "associations": []
}

export default sebleichProcessBuilderExtension;
