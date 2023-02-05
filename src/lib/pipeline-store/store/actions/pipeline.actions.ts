import { createAction } from "@ngrx/store";
import { IPipeline } from "src/lib/pipeline-store/interfaces/pipeline.interface";

export const addIPipeline = createAction(
    '[IPipeline] Add IPipeline',
    (pipeline: IPipeline) => ({ pipeline })
);

export const removeIPipeline = createAction(
    '[IPipeline] Remove IPipeline',
    (pipeline: IPipeline) => ({ pipeline })
);
