import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { combineLatest, of, throwError, timer } from "rxjs";
import { catchError, switchMap, take } from "rxjs/operators";
import { Solution } from "src/app/classes";
import { ALGORITHMS, algorithms } from "src/app/globals";
import { DataService } from "src/app/services/data.service";
import { AllInOneRowSolver } from "src/app/solvers/all-in-one-row";
import { StartLeftBottomSolver } from "src/app/solvers/start-left-bottom";
import { AlgorihmStatusWrapper, ALGORITHM_CALCULATION_STATUS, CALCULATION_ERROR } from "./calculation-component.classes";

@Injectable()
export class CalculationComponentService {

    algorithms: AlgorihmStatusWrapper[] = [];

    constructor(
        private _dataService: DataService,
        private _router: Router
    ) {
        this._setUp();
    }

    calculateAlgorithm(wrapper: AlgorihmStatusWrapper) {
        wrapper.errors.splice(0, wrapper.errors.length);
        wrapper.status = ALGORITHM_CALCULATION_STATUS.PREPARE_CALCULATION;
        timer(1000).pipe(switchMap(_ => {
            switch (wrapper.algorithm.code) {
                case ALGORITHMS.ALL_IN_ONE_ROW:
                    wrapper.status = ALGORITHM_CALCULATION_STATUS.CALCULATING;
                    return combineLatest([of(wrapper), new AllInOneRowSolver(this._dataService, wrapper.solutionDescription).solve().pipe(catchError((errorCode) => {
                        return throwError({
                            wrapper: wrapper,
                            errorCode: errorCode
                        });
                    }))]);

                case ALGORITHMS.START_LEFT_BOTTOM:
                    wrapper.status = ALGORITHM_CALCULATION_STATUS.CALCULATING;
                    return combineLatest([of(wrapper), new StartLeftBottomSolver(this._dataService, wrapper.solutionDescription).solve().pipe(catchError((errorCode) => {
                        return throwError({
                            wrapper: wrapper,
                            errorCode: errorCode
                        });
                    }))]);

                default:
                    return throwError({
                        wrapper: wrapper,
                        errorCode: CALCULATION_ERROR.ALGORITHM_NOT_IMPLEMENTED
                    });
            }
        })).subscribe(this._calculationCallback);
    }

    visualizeSolution(solution: Solution) {
        this._dataService.setCurrentSolution(solution);
        this._router.navigate(['/visualizer']);
    }

    private _calculationCallback = {
        next: ([wrapper, solution]: [AlgorihmStatusWrapper, Solution]) => {
            wrapper.solution = solution;
            wrapper.status = ALGORITHM_CALCULATION_STATUS.CALCULATED;
        },
        error: (error: { wrapper: AlgorihmStatusWrapper, errorCode: CALCULATION_ERROR }) => {
            error.wrapper.status = ALGORITHM_CALCULATION_STATUS.ERROR;
            error.wrapper.errors.push(error.errorCode);
        },
        complete: () => {

        }
    };

    private _setUp() {
        for (let algorithm of algorithms) {
            this.algorithms.push({
                'algorithm': algorithm,
                'errors': [],
                'status': ALGORITHM_CALCULATION_STATUS.UNCHECKED,
                'solutionDescription': algorithm.title,
                'solution': null
            } as AlgorihmStatusWrapper)
        }
        this._dataService.solutions$
            .pipe(take(1))
            .subscribe((solutions: Solution[]) => {
                for (let solution of solutions) {
                    let wrapper = this.algorithms.find(x => x.algorithm.title === solution._Algorithm);
                    if (wrapper) {
                        wrapper.status = ALGORITHM_CALCULATION_STATUS.CALCULATED;
                        wrapper.solution = solution;
                    }
                }
            });
    }

}