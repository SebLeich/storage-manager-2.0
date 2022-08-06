import { IParamDefinition } from "src/lib/process-builder/globals/i-param-definition";

export interface IEmbeddedFunctionImplementationData {
    implementation: string[];
    isProcessOutput: boolean;
    name: string;
    canFail: boolean;
    normalizedName: string;
    outputParamName: string;
    normalizedOutputParamName: string;
    outputParamValue: IParamDefinition[];
    outputParamInterface: number;
    inputParam: number | null;
}
