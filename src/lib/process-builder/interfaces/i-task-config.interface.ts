import { IParam } from "../globals/i-param";

export interface ITaskConfig {
    'title': string;
    'input': IParam | IParam[];
    'output': IParam | IParam[];
}
