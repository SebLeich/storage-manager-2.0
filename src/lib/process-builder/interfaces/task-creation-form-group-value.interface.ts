import { FormControl, FormGroup } from "@angular/forms";
import { ParamCodes } from "src/config/param-codes";
import { IParam } from "./param.interface";
import { IParamDefinition } from "./param-definition.interface";
import { GatewayType } from "../types/gateway.type";

export interface ITaskCreationFormGroupValue {
    canFail: boolean;
    entranceGatewayType: GatewayType | null;
    functionIdentifier: number | null;
    implementation: string[] | null;
    inputParam: ParamCodes[] | number | null;
    interface: number | null;
    isProcessOutput: boolean;
    name: string;
    normalizedOutputParamName: string;
    normalizedName: string;
    outputParamName: string;
    outputParamValue: IParam | IParamDefinition[] | null;
    outputParamInterface: number | null;
    requireCustomImplementation: boolean;
}

export type TaskCreationFormGroup = FormGroup<{ [key in keyof ITaskCreationFormGroupValue]?: FormControl<ITaskCreationFormGroupValue[key]> }>; 