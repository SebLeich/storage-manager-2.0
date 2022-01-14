import { ReplaySubject } from "rxjs";
import { Solution } from "src/app/classes";
import { ALGORITHMS } from "src/app/globals";

export class AlgorihmStatusWrapper {
    status: number = ALGORITHM_CALCULATION_STATUS.UNCHECKED;
    errors: CALCULATION_ERROR[];
    algorithm: { title: string, description: string, code: ALGORITHMS };
    solution: Solution;
    solutionDescription: string;
}

export enum ALGORITHM_CALCULATION_STATUS {
    UNCHECKED, PENDING, PREPARE_CALCULATION, CALCULATING, CALCULATED, ERROR
}

export enum CALCULATION_ERROR {
    ALGORITHM_NOT_IMPLEMENTED, CONTAINER_NOT_READY
}
