import { FormControl, FormGroup } from "@angular/forms";
import { IParam, IParamDefinition } from "@process-builder/interfaces";
import { GatewayType } from "../types/gateway.type";
import { ITextLeaf } from "./text-leaf.interface";
import { ParamType } from "../types/param.type";

export interface ITaskCreationFormGroupValue {
    entranceGatewayType: GatewayType | null;
    functionIdentifier: number | null;
    functionImplementation: ITextLeaf | null;
    functionCanFail: boolean;
    functionFinalizesFlow: boolean;
    functionName: string;
    functionNormalizedName: string;
    outputIsProcessOutput: boolean;
    outputParamName: string;
    outputParamNormalizedName: string;
    outputParamValue: IParam | IParamDefinition[] | null;
    outputParamType: ParamType | null;
    outputParamInterface: string | null;
}

export type TaskCreationFormGroup = FormGroup<{ [key in keyof ITaskCreationFormGroupValue]?: FormControl<ITaskCreationFormGroupValue[key]> }>; 