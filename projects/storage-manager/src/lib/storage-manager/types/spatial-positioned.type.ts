import { Positioned } from "./positioned.type";
import { Spatial } from "./spatial.type";

export type SpatialPositioned = Positioned & Spatial & {
    rCoord: number;
    tCoord: number;
    fCoord: number;
    points: Positioned[];
};