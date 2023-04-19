import { IInputParam } from "./input-param.interface";

export interface IFunctionTemplate {
    identifier: number;
    name: string;
    normalizedName?: string;
    description?: string | null;
    implementation?: (args?: any) => Promise<any>;
    canFail?: boolean;
    requireCustomImplementation: boolean;
    finalizesFlow?: boolean;
    inputTemplates: (IInputParam | 'dynamic')[] | null | 'dynamic';
    outputTemplate: string | null | 'dynamic';
}