import { Algorithm } from "src/app/globals";
import { ISolution } from "src/lib/storage-manager-store/interfaces/solution.interface";
import { CalculationError } from "../enumerations/calculation-error";

export interface IAlgorithmStatusWrapper {
    status: number;
    errors: CalculationError[];
    algorithm: { title: string, description: string, code: Algorithm };
    solution?: ISolution;
    solutionDescription: string;
    available: boolean;
}