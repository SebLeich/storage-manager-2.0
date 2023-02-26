import { createAction, props } from "@ngrx/store";
import { ISolutionPreview } from "../../interfaces/solution-preview.interface";
import { ISolution } from "../../interfaces/solution.interface";

export const solutionPreviewActions = {
    AnnounceSolutionPreview: '[SolutionPreview] Announce Solution Preview',
    LoadSolutionPreview: '[SolutionPreview] Load Solution Preview',
    UpsertSolutionPreview: '[SolutionPreview] Upsert Solution Preview'
}

export const announceSolutionPreview = createAction(
    solutionPreviewActions.AnnounceSolutionPreview,
    props<{ solutionId: string }>()
);

export const loadSolutionPreview = createAction(
    solutionPreviewActions.LoadSolutionPreview,
    props<{ arg: ISolution | string }>()
);

export const upsertSolutionPreview = createAction(
    solutionPreviewActions.UpsertSolutionPreview,
    props<{ solutionPreview: ISolutionPreview }>()
);