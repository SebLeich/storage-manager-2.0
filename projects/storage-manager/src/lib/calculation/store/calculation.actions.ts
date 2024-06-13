import { SolutionWrapper } from "@/lib/storage-manager/types/solution-wrapper.type";
import { createAction, props } from "@ngrx/store";

export const setContainerDimensions = createAction(
    '[Calculation] Set Container Dimensions',
    props<{ containerHeight?: number, containerWidth?: number }>()
);

export const setSolutionWrappers = createAction(
    '[Calculation] Set Solution Wrappers',
    props<{ solutionWrappers: SolutionWrapper[] }>()
);