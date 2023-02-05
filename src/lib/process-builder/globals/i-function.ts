import { InjectionToken } from "@angular/core";
import { IDynamicInputParamsConfig } from "./i-dynamic-input-params-config";
import { IInputParam } from "./i-input-param";
import { IOutputParam } from "../interfaces/i-output-param.interface";

export interface IFunction {
    identifier: number;
    name: string;
    normalizedName?: string;
    description?: string | null;
    inputParams: IInputParam | IInputParam[] | null;
    useDynamicInputParams?: undefined | boolean | IDynamicInputParamsConfig;
    output: IOutputParam | null;
    implementation?: (args?: any) => Promise<any>;
    pseudoImplementationComputationName?: string;
    canFail: boolean;
    customImplementation?: string[];
    requireCustomImplementation?: boolean;
    requireDynamicInput?: boolean;
    requireDataMapping?: boolean;
    finalizesFlow?: boolean;
}

export const FUNCTIONS_CONFIG_TOKEN: InjectionToken<IFunction[]> = new InjectionToken<IFunction[]>("FUNCTION_CONFIG");
