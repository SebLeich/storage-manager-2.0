import { Algorithm } from "../../../app/globals";
import { IContainer } from "./container.interface";
import { IEntity } from "../../../app/interfaces/i-entity.interface";
import { IStep } from "../../../app/interfaces/i-step.interface";

export interface ISolution extends IEntity {
    id: string;
    container: IContainer;
    steps: IStep[];
    calculated: string;
    description: string | null;
    calculationSource: {
        staticAlgorithm?: Algorithm, 
        title: string
    };
}