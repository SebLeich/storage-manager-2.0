import { Algorithm } from "src/app/globals";
import { ISolution } from "@smgr/interfaces";
import { CalculationError } from "../enumerations/calculation-error";

export interface IAlgorithmStatusWrapper {
    status: number;
    errors: CalculationError[];
    algorithm: { title: string, description: string, code: Algorithm };
    solution?: ISolution;
    solutionDescription: string;
    available: boolean;
}