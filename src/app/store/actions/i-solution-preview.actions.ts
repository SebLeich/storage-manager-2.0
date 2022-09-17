import { createAction, props } from "@ngrx/store";
import { ISolutionPreview } from "src/app/interfaces/i-solution-preview.interface";
import { ISolution } from "src/app/interfaces/i-solution.interface";

export const solutionActions = {
    AnnounceSolutionPreview: '[SolutionPreview] Announce Solution Preview',
    LoadSolutionPreview: '[SolutionPreview] Load Solution Preview',
    UpsertSolutionPreview: '[SolutionPreview] Upsert Solution Preview'
}

export const announceSolutionPreview = createAction(
    solutionActions.AnnounceSolutionPreview,
    props<{ solutionId: string }>()
);

export const loadSolutionPreview = createAction(
    solutionActions.LoadSolutionPreview,
    props<{ arg: ISolution | string }>()
);

export const upsertSolutionPreview = createAction(
    solutionActions.UpsertSolutionPreview,
    props<{ solutionPreview: ISolutionPreview }>()
);