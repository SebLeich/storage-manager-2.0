import { GoodTexture } from "./good-texture.type";
import { Identifiable } from "./identifiable.type";
import { Positioned } from "./positioned.type";
import { Spatial } from "./spatial.type";

export type Good = Positioned & Spatial & Identifiable & {
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