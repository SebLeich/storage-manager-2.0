export default {
    "name": "process builder extension",
    "uri": "https://www.sebleich.com/schema/xml/process-builder-extension",
    "prefix": "slpb",
    "xml": {
        "tagAlias": "lowerCase"
    },
    "types": [
        {
            "name": "ActivityExtension",
            "superClass": [ "Element" ],
            "properties": [
                {
                    "name": "activityFunctionId",
                    "isAttr": true,
                    "type": "Integer"
                }
            ]
        }, {
            "name": "GatewayExtension",
            "superClass": [ "Element" ],
            "properties": [
                {
                    "name": "gatewayType",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        }, {
            "name": "DataObjectExtension",
            "superClass": [ "Element" ],
            "properties": [
                {
                    "name": "outputParam",
                    "isAttr": true,
                    "type": "Integer"
                }
            ]
        }
    ],
    "emumerations": [],
    "associations": []
}
