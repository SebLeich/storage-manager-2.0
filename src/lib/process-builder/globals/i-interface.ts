import { InjectionToken } from "@angular/core";
import { IParamDefinition } from "./i-param-definition";

export interface IInterface {
    identifier: number;
    name: string;
    normalizedName: string;
    typeDef: IParamDefinition[];
}

export const INTERFACES_CONFIG_TOKEN: InjectionToken<IInterface[]> = new InjectionToken<IInterface[]>("INTERFACE_CONFIG");
