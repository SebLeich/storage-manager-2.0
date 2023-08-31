import { IPipelineAction } from "./pipeline-action.interface";
import { IPipeline } from "./pipeline.interface";

export interface IPipelineDto extends IPipeline {
    actions: IPipelineAction[]; 
}