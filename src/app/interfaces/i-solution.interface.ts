import { Algorithm } from "../globals";
import { IContainer } from "./i-container.interface";
import { IEntity } from "./i-entity.interface";
import { IGroup } from "./i-group.interface";
import { IStep } from "./i-step.interface";

export interface ISolution extends IEntity {
    id: string;
    container?: IContainer;
    algorithm?: string;
    groups?: IGroup[];
    steps?: IStep[];
    calculated?: string;
    description?: string | null;
    calculationSource?: { staticAlgorithm?: Algorithm };
}