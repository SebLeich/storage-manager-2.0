import { Unit } from "@/app/types/unit.type";
import { Identifiable } from "./identifiable.type";
import { Positioned } from "./positioned.type";
import { Spatial } from "./spatial.type";
import { Good } from "./good.type";

export type Container = Positioned & Spatial & Identifiable & {
    unit: Unit;
    goods: Good[];
}