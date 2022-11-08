import { IParamDefinition } from "../globals/i-param-definition";
import { GatewayType } from "../types/gateway.type";

export interface ITaskCreationData {
    functionIdentifier: number | null;
    canFail: boolean | null;
    implementation: string[] | null;
    name: string | null;
    normalizedName: string | null;
    outputParamName: string | null;
    normalizedOutputParamName: string | null;
    outputParamValue: IParamDefinition[] | null;
    entranceGatewayType: GatewayType | null;
    inputParam: number | null;
}