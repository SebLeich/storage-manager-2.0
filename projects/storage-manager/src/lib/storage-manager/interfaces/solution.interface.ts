import { Algorithm } from "../../../app/globals";
import { IContainer } from "./container.interface";
import { IIdentifiable } from "./identifiable.interface";
import { IStep } from "./step.interface";

export interface ISolution extends IIdentifiable {
    container: IContainer;
    steps: IStep[];
    calculated: string;
    description: string | null;
    calculationSource: {
        staticAlgorithm?: Algorithm, 
        title: string
    };
}