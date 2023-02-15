import { InjectionToken } from "@angular/core";
import { ITaskConfig } from "./task-config.interface";
import { IErrorGatewayConfig } from "./error-gateway-config.interface";
import { IProcessStatusConfig } from "../globals/i-process-status-config";

export interface IProcessBuilderConfig {
    dynamicParamDefaultNaming: string;
    defaultFunctionName: string;
    statusConfig: IProcessStatusConfig;
    taskConfig: ITaskConfig[];
    errorGatewayConfig: IErrorGatewayConfig;
    defaultBpmnModelName: string;
    expectInterface?: number;
}

export const PROCESS_BUILDER_CONFIG_TOKEN: InjectionToken<IProcessBuilderConfig> = new InjectionToken<IProcessBuilderConfig>("PROCESS_BUILDER_CONFIG");
