import { InjectionToken } from "@angular/core";
import { IErrorGatewayConfig } from "./i-error-gateway-config";
import { IProcessStatusConfig } from "./i-process-status-config";
import { ITaskConfig } from "./i-task-config";

export interface IProcessBuilderConfig {
    'editable': boolean;
    'hideEvents': boolean;
    'hideTasks': boolean;
    'hideGateways': boolean;
    'hideSubProcesses': boolean;
    'hideDataObjectReferences': boolean;
    'hideDatabases': boolean;
    'hidePools': boolean;
    'hideGroups': boolean;
    'dynamicParamDefaultNaming': string;
    'defaultFunctionName': string;
    'statusConfig': IProcessStatusConfig;
    'taskConfig': ITaskConfig[];
    'errorGatewayConfig': IErrorGatewayConfig;
    'defaultBpmnModelName': string;
}

export const PROCESS_BUILDER_CONFIG_TOKEN: InjectionToken<IProcessBuilderConfig> = new InjectionToken<IProcessBuilderConfig>("PROCESS_BUILDER_CONFIG");
