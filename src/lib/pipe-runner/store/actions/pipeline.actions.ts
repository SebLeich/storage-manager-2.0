import { createAction } from "@ngrx/store";
import { IPipeline } from "../../interfaces/pipeline.interface";

export const addIPipeline = createAction(
    '[IPipeline] Add IPipeline',
    (pipeline: IPipeline) => ({ pipeline })
);