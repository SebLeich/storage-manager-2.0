import { createAction, props } from "@ngrx/store";

export const setContainerDimensions = createAction(
    '[Calculation] Set Container Dimensions',
    props<{ containerHeight?: number, containerWidth?: number }>()
);