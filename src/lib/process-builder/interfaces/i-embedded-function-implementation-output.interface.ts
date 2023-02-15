import { IParamDefinition } from "src/lib/process-builder/interfaces/param-definition.interface";

export interface IEmbeddedFunctionImplementationData {
    implementation: string[];
    name: string;
    canFail: boolean;
    normalizedName: string;
    outputParamName: string;
    normalizedOutputParamName: string;
    outputParamValue: IParamDefinition[];
    inputParam: number | null;
}
