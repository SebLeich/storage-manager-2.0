import { InjectionToken } from "@angular/core";
import { ITaskConfig } from "./task-config.interface";
import { IErrorGatewayConfig } from "./error-gateway-config.interface";
import { IProcessStatusConfig } from "./process-status-config.interface";

export interface IProcessBuilderConfig {
    dynamicParamDefaultNaming: string;
    defaultFunctionName: string;
    statusConfig: IProcessStatusConfig;
    taskConfig: ITaskConfig[];
    errorGatewayConfig: IErrorGatewayConfig;
    defaultBpmnModelName: string;
    expectInterface?: string;
}

export const PROCESS_BUILDER_CONFIG_TOKEN: InjectionToken<IProcessBuilderConfig> = new InjectionToken<IProcessBuilderConfig>("PROCESS_BUILDER_CONFIG");
