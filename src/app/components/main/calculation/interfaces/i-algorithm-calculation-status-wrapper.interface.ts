import { Solution } from "src/app/classes";
import { ALGORITHMS } from "src/app/globals";
import { CalculationError } from "../enumerations/calculation-error";

export interface IAlgorihmStatusWrapper {
    status: number;
    errors: CalculationError[];
    algorithm: { title: string, description: string, code: ALGORITHMS };
    solution: Solution;
    solutionDescription: string;
    available: boolean;
}