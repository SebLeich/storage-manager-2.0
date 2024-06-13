import { SpatialPositioned } from "./spatial-positioned.type";

export type UnusedPosition = SpatialPositioned & {
    index: number;
    groupRestrictedBy: number | null;
    rotated: boolean;
}