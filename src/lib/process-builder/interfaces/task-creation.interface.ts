import { FormControl } from "@angular/forms";
import { ParamCodes } from "src/config/param-codes";
import { IParam } from "./param.interface";
import { IParamDefinition } from "./param-definition.interface";
import { GatewayType } from "../types/gateway.type";

export interface ITaskCreationFormGroup {
    canFail: FormControl<boolean>;
    entranceGatewayType: FormControl<GatewayType | null>;
    functionIdentifier: FormControl<number | null>;
    implementation: FormControl<string[] | null>;
    inputParam: FormControl<ParamCodes[] | number | null>;
    interface: FormControl<number | null>;
    isProcessOutput: FormControl<boolean>;
    name: FormControl<string>;
    normalizedOutputParamName: FormControl<string>;
    normalizedName: FormControl<string>;
    outputParamName: FormControl<string>;
    outputParamValue: FormControl<IParam | IParamDefinition[] | null>;
    requireCustomImplementation: FormControl<boolean>;
}