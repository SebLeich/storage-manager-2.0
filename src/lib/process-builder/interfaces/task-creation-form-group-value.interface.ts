import { FormControl, FormGroup } from "@angular/forms";
import { ParamCodes } from "src/config/param-codes";
import { IParam, IParamDefinition } from "@process-builder/interfaces";
import { GatewayType } from "../types/gateway.type";
import { ITextLeaf } from "./text-leaf.interface";

export interface ITaskCreationFormGroupValue {
    canFail: boolean;
    entranceGatewayType: GatewayType | null;
    functionIdentifier: number | null;
    implementation: ITextLeaf | null;
    inputParam: ParamCodes[] | number | null;
    interface: string | null;
    isProcessOutput: boolean;
    name: string;
    normalizedOutputParamName: string;
    normalizedName: string;
    outputParamName: string;
    outputParamValue: IParam | IParamDefinition[] | null;
    outputTemplateName: string;
    requireCustomImplementation: boolean;
}

export type TaskCreationFormGroup = FormGroup<{ [key in keyof ITaskCreationFormGroupValue]?: FormControl<ITaskCreationFormGroupValue[key]> }>; 