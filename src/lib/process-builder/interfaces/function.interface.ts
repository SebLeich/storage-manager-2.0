import { InjectionToken } from "@angular/core";
import { IFunctionTemplate } from "./function-template.interface";

export interface IFunction extends IFunctionTemplate {
    customImplementation?: string[];
    requireDynamicInput?: boolean;
    requireDataMapping?: boolean;
    inputs: number | number[] | null;
    output: number | null;
}

export const FUNCTIONS_CONFIG_TOKEN: InjectionToken<IFunction[]> = new InjectionToken<IFunction[]>("FUNCTION_CONFIG");
