import { ISolutionWrapper } from "@/lib/storage-manager/interfaces";
import { createAction, props } from "@ngrx/store";

export const setSolution = createAction(
    '[Visualization] Set Solution',
    props<{ solution: ISolutionWrapper }>()
);