import { createAction } from "@ngrx/store";
import { ISolutionWrapper } from "@smgr/interfaces";
import { IPipelineAction } from "src/lib/pipeline-store/interfaces/pipeline-action.interface";

export const addIPipelineAction = createAction(
    '[IPipeline] Add IPipelineAction',
    (pipelineAction: IPipelineAction) => ({ pipelineAction })
);

export const addIPipelineActions = createAction(
    '[IPipeline] Add IPipelineActions',
    (pipelineActions: IPipelineAction[]) => ({ pipelineActions })
);

export const setIPipelineActionSolution = createAction(
    '[IPipeline] Set IPipelineAction Solution',
    (pipelineActionIdentifier: string, solutionReference: ISolutionWrapper) => ({ pipelineActionIdentifier, solutionReference })
);
