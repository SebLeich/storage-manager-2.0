import { IPosition } from "../../lib/storage-manager-store/interfaces/position.interface";

export interface IPossibilities {
    rotated: IPosition[];
    notRotated: IPosition[];
}