import { createAction, props } from "@ngrx/store";
import { ISolutionPreview } from "src/lib/storage-manager-store/interfaces/solution-preview.interface";
import { ISolution } from "src/lib/storage-manager-store/interfaces/solution.interface";

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