import { InjectionToken } from "@angular/core";
import { IParamDefinition } from "./param-definition.interface";

export interface IInterface {
    identifier: string;
    name: string;
    normalizedName: string;
    typeDef: IParamDefinition[];
}

export const INTERFACES_CONFIG_TOKEN: InjectionToken<IInterface[]> = new InjectionToken<IInterface[]>("INTERFACE_CONFIG");
