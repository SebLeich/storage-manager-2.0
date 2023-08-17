import { IInputParam } from "./input-param.interface";

export interface IFunctionTemplate {
    identifier: number;
    name: string;
    normalizedName?: string;
    description?: string | null;
    implementation?: string;
    canFail?: boolean;
    requireCustomImplementation: boolean;
    requireStaticOutputDefinition: boolean;
    finalizesFlow?: boolean;
    inputTemplates: (IInputParam | 'dynamic')[] | null | 'dynamic';
    outputTemplate: string | null;
}