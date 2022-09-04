import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { combineLatest, of, throwError, timer } from "rxjs";
import { catchError, switchMap, take } from "rxjs/operators";
import { ALGORITHMS, algorithms } from "src/app/globals";
import { ISolution } from "src/app/interfaces/i-solution.interface";
import { AllInOneRowSolver } from "src/app/solvers/all-in-one-row";
import { StartLeftBottomSolver } from "src/app/solvers/start-left-bottom";
import { SuperFloSolver } from "src/app/solvers/super-flo";
import { AlgorithmCalculationStatus } from "./enumerations/algorithm-calculation-status.enum";
import { CalculationError } from "./enumerations/calculation-error";
import { IAlgorithmStatusWrapper } from "./interfaces/i-algorithm-calculation-status-wrapper.interface";

import * as fromISolutionState from 'src/app/store/reducers/i-solution.reducers';
import * as fromICalculationContextState from 'src/app/store/reducers/i-calculation-context.reducers';
import * as fromIGroupState from 'src/app/store/reducers/i-group.reducers';
import * as fromIOrderState from 'src/app/store/reducers/i-order.reducers';
import * as fromIProductState from 'src/app/store/reducers/i-product.reducers';

import { setCurrentSolution } from "src/app/store/actions/i-solution.actions";
import { selectSnapshot } from "src/lib/process-builder/globals/select-snapshot";
import { selectSolutions } from "src/app/store/selectors/i-solution.selectors";

@Injectable()
export class CalculationComponentService {

    algorithms: IAlgorithmStatusWrapper[] = [];

    constructor(
        private _solutionStore: Store<fromISolutionState.State>,
        private _groupStore: Store<fromIGroupState.State>,
        private _orderStore: Store<fromIOrderState.State>,
        private _productStore: Store<fromIProductState.State>,
        private _calculationContextStore: Store<fromICalculationContextState.State>,
        private _router: Router
    ) {
        this._setUp();
    }

    async calculateAlgorithm(wrapper: IAlgorithmStatusWrapper) {
        wrapper.errors.splice(0, wrapper.errors.length);
        wrapper.status = AlgorithmCalculationStatus.PrepareCalculation;

        let result;

        switch (wrapper.algorithm.code) {

            case ALGORITHMS.ALL_IN_ONE_ROW:
                wrapper.status = AlgorithmCalculationStatus.Calculating;
                result = await new AllInOneRowSolver(wrapper.solutionDescription, this._solutionStore, this._groupStore, this._orderStore, this._calculationContextStore).solve();
                break;

        }

        if (!result) {
            return;
        }



        timer(1000).pipe(switchMap(_ => {
            switch (wrapper.algorithm.code) {

                case ALGORITHMS.START_LEFT_BOTTOM:
                    wrapper.status = AlgorithmCalculationStatus.Calculating;
                    return combineLatest([of(wrapper), new StartLeftBottomSolver(wrapper.solutionDescription).solve().pipe(catchError((errorCode) => {
                        return throwError({
                            wrapper: wrapper,
                            errorCode: errorCode
                        });
                    }))]);

                case ALGORITHMS.SUPER_FLO:
                    wrapper.status = AlgorithmCalculationStatus.Calculating;
                    return combineLatest([of(wrapper), new SuperFloSolver(wrapper.solutionDescription).solve().pipe(catchError((errorCode) => {
                        return throwError({
                            wrapper: wrapper,
                            errorCode: errorCode
                        });
                    }))]);

                default:
                    return throwError({
                        wrapper: wrapper,
                        errorCode: CalculationError.AlgorithmNotImplemented
                    });
            }
        })).subscribe(this._calculationCallback);
    }

    visualizeSolution(solution: ISolution) {
        this._solutionStore.dispatch(setCurrentSolution({ solution }));
        this._router.navigate(['/visualizer']);
    }

    private _calculationCallback = {
        next: ([wrapper, solution]: [IAlgorithmStatusWrapper, ISolution]) => {
            wrapper.solution = solution;
            wrapper.status = AlgorithmCalculationStatus.Calculated;
        },
        error: (error: { wrapper: IAlgorithmStatusWrapper, errorCode: CalculationError }) => {
            error.wrapper.status = AlgorithmCalculationStatus.Error;
            error.wrapper.errors.push(error.errorCode);
        },
        complete: () => {

        }
    };

    private async _setUp() {
        for (let algorithm of algorithms) {
            this.algorithms.push({
                'algorithm': algorithm,
                'errors': [],
                'status': AlgorithmCalculationStatus.Unchecked,
                'solutionDescription': algorithm.title,
                'solution': undefined,
                'available': algorithm.code === ALGORITHMS.AI_SUPPORTED_SOLVER ? false : true
            });
        }
        const solutions = await selectSnapshot(this._solutionStore.select(selectSolutions));
        for (let algorithm of this.algorithms) {
            algorithm.solution = undefined;
            algorithm.status = AlgorithmCalculationStatus.Unchecked;
        }
        for (let solution of solutions) {
            let wrapper = this.algorithms.find(x => x.algorithm.title === solution.algorithm);
            if (wrapper) {
                wrapper.status = AlgorithmCalculationStatus.Calculated;
                wrapper.solution = solution;
            }
        }
    }

}