import { InjectionToken } from "@angular/core";
import { IParamDefinition } from "./param-definition.interface";

export interface IParam extends IParamDefinition {
    identifier: number;
    isProcessOutput?: boolean;
    _isIParam: boolean;
}

export const PARAMS_CONFIG_TOKEN: InjectionToken<IParam[]> = new InjectionToken<IParam[]>("PARAM_CONFIG");
