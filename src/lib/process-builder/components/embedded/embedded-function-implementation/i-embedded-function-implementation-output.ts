import { IParamDefinition } from "src/lib/process-builder/globals/i-param-definition";

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
