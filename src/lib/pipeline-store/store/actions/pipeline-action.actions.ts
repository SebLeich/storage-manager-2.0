import { createAction } from "@ngrx/store";
import { IPipelineAction } from "src/lib/pipeline-store/interfaces/pipeline-action.interface";

export const addIPipelineAction = createAction(
    '[IPipeline] Add IPipelineAction',
    (pipelineAction: IPipelineAction) => ({ pipelineAction })
);

export const addIPipelineActions = createAction(
    '[IPipeline] Add IPipelineActions',
    (pipelineActions: IPipelineAction[]) => ({ pipelineActions })
);
