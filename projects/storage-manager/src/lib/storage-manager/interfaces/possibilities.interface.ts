import { Identifiable } from "../types/identifiable.type";
import { UnusedPosition } from "../types/unused-position.type";

export interface IPossibilities {
    rotated: (UnusedPosition & Identifiable)[];
    notRotated: (UnusedPosition & Identifiable)[];
}