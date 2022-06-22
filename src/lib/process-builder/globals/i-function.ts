import { InjectionToken } from "@angular/core";
import { IDynamicInputParamsConfig } from "./i-dynamic-input-params-config";
import { IInputParam } from "./i-input-param";
import { IOutputParam } from "./i-output-param";

export interface IFunction {
    identifier: number;
    name: string;
    normalizedName?: string;
    description?: string | null;
    inputParams: IInputParam | IInputParam[] | null;
    useDynamicInputParams?: undefined | boolean | IDynamicInputParamsConfig;
    output: IOutputParam | null;
    pseudoImplementation: (args?: any) => any;
    canFail: boolean;
    customImplementation?: string[];
    requireCustomImplementation?: boolean;
}

export const FUNCTIONS_CONFIG_TOKEN: InjectionToken<IFunction[]> = new InjectionToken<IFunction[]>("FUNCTION_CONFIG");
