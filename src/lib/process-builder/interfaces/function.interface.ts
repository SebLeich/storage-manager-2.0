import { InjectionToken } from "@angular/core";
import { IDynamicInputParamsConfig } from "./dynamic-input-params-config.interface";
import { IInputParam } from "./input-param.interface";
import { IOutputParam } from "./output-param.interface";

export interface IFunction {
    identifier: number;
    name: string;
    normalizedName?: string;
    description?: string | null;
    useDynamicInputParams?: undefined | boolean | IDynamicInputParamsConfig;
    implementation?: (args?: any) => Promise<any>;
    pseudoImplementationComputationName?: string;
    canFail: boolean;
    customImplementation?: string[];
    requireCustomImplementation?: boolean;
    requireDynamicInput?: boolean;
    requireDataMapping?: boolean;
    finalizesFlow?: boolean;
    inputParams: IInputParam[] | null;
    output: IOutputParam | null;
}

export const FUNCTIONS_CONFIG_TOKEN: InjectionToken<IFunction[]> = new InjectionToken<IFunction[]>("FUNCTION_CONFIG");
