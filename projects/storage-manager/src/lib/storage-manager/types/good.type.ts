import { GoodTexture } from "./good-texture.type";
import { Identifiable } from "./identifiable.type";
import { SpatialPositioned } from "./spatial-positioned.type";

export type Good = SpatialPositioned & Identifiable & {
    desc: string | null;
    group: string | null;
    turningAllowed: boolean;
    turned: boolean;
    stackingAllowed: boolean;
    stackedOnGood: string | null;
    sequenceNr: number;
    orderGuid: string;
    texture: GoodTexture;
}