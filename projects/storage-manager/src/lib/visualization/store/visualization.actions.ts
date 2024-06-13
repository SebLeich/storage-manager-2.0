import { SolutionValidationErrorWrapper } from "@/lib/shared/types/solution-validation-error-wrapper.type";
import { createAction, props } from "@ngrx/store";
import { SolutionWrapper } from "../../storage-manager/types/solution-wrapper.type";
import { Group } from "@/lib/storage-manager/types/group.type";

export const setSolution = createAction(
    '[Visualization] Set Solution',
    props<{ solutionWrapper: SolutionWrapper }>()
);

export const clearSolution = createAction(
    '[Visualization] Clear Solution'
);

export const setSolutionValidation = createAction(
    '[Visualization] Set Solution Validation',
    props<{ validation: SolutionValidationErrorWrapper[] }>()
);

export const updateGroup = createAction(
    '[Visualization] Update Group',
    props<{ group: Group }>()
);