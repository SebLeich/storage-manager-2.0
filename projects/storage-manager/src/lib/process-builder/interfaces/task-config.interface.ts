import { IParam } from "./param.interface";

export interface ITaskConfig {
    'title': string;
    'input': IParam | IParam[];
    'output': IParam | IParam[];
}
