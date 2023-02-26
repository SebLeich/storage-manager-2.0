import { IIdentifiable } from "../../lib/storage-manager-store/interfaces/identifiable.interface";
import { IPositionedElement } from "../../lib/storage-manager-store/interfaces/positioned.interface";
import { ISpace } from "./space.interface";

export interface IDimension extends IIdentifiable, IPositionedElement, ISpace {
    rCoord: number;
    tCoord: number;
    fCoord: number;
    points: IPositionedElement[];
}