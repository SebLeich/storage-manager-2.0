import { IProcessBuilderConfig } from "src/lib/process-builder/globals/i-process-builder-config";

export default {
    'editable': true,
    'hideDataObjectReferences': true,
    'hideDatabases': false,
    'hideEvents': false,
    'hideGateways': true,
    'hideGroups': true,
    'hidePools': true,
    'hideSubProcesses': true,
    'hideTasks': true,
    'statusConfig': {
        'initialStatus': 'initial',
        'finalStatus': 'final'
    },
    'errorGatewayConfig': {
        'errorConnectionName': 'on error',
        'gatewayName': 'task failed?',
        'successConnectionName': 'on success'
    },
    'dynamicParamDefaultNaming': 'unnamed param',
    'defaultFunctionName': 'unnamed function'
} as IProcessBuilderConfig;