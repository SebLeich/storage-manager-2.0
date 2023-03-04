import { IInputParam } from "./input-param.interface";
import { IOutputParam } from "./output-param.interface";

export interface IFunctionTemplate {
    // further props
    inputParams: IInputParam[] | null;
    output: IOutputParam | null;
}