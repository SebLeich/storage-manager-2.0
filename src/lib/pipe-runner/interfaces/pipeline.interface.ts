import { IPipelineAction } from "./pipeline-action.interface";

export interface IPipeline {
    name: string;
    actions: IPipelineAction[]; 
}