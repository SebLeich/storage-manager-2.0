import { GoodTexture } from "./good-texture.type";
import { Identifiable } from "./identifiable.type";
import { Spatial } from "./spatial.type";

export type Order = Spatial & Identifiable & {
    index: number;
    description: string | null;
    quantity: number;
    turningAllowed: boolean;
    stackingAllowed: boolean;
    group: string;
    texture?: GoodTexture;
}