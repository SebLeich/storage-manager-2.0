import { InjectionToken } from "@angular/core";
import { IParamDefinition } from "./i-param-definition";

export interface IParam extends IParamDefinition {
    identifier: number;
}

export const PARAMS_CONFIG_TOKEN: InjectionToken<IParam[]> = new InjectionToken<IParam[]>("PARAM_CONFIG");
