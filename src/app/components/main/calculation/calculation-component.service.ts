import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Algorithm, algorithms } from "src/app/globals";
import { ISolution } from "src/app/interfaces/i-solution.interface";
import { AllInOneRowSolver } from "src/app/solvers/all-in-one-row";
import { StartLeftBottomSolver } from "src/app/solvers/start-left-bottom";
import { SuperFloSolver } from "src/app/solvers/super-flo";
import { AlgorithmCalculationStatus } from "./enumerations/algorithm-calculation-status.enum";
import { CalculationError } from "./enumerations/calculation-error";
import { IAlgorithmStatusWrapper } from "./interfaces/i-algorithm-calculation-status-wrapper.interface";

import { setCurrentSolution, updateAlgorithmSolution } from "src/app/store/actions/i-solution.actions";
import { selectSnapshot } from "src/lib/process-builder/globals/select-snapshot";
import { selectSolutions } from "src/app/store/selectors/i-solution.selectors";

@Injectable()
export class CalculationComponentService {

    algorithms: IAlgorithmStatusWrapper[] = [];

    constructor(
        private _store: Store,
        private _router: Router
    ) {
        this._setUp();
    }

    async calculateAlgorithm(wrapper: IAlgorithmStatusWrapper) {
        wrapper.errors.splice(0, wrapper.errors.length);
        wrapper.status = AlgorithmCalculationStatus.PrepareCalculation;

        let result: ISolution | undefined;

        switch (wrapper.algorithm.code) {

            case Algorithm.AllInOneRow:
                wrapper.status = AlgorithmCalculationStatus.Calculating;
                result = await new AllInOneRowSolver(wrapper.solutionDescription, this._store).solve();
                break;

            case Algorithm.StartLeftBottom:
                wrapper.status = AlgorithmCalculationStatus.Calculating;
                result = await new StartLeftBottomSolver(wrapper.solutionDescription, this._store).solve();
                break;

            case Algorithm.SuperFlo:
                wrapper.status = AlgorithmCalculationStatus.Calculating;
                result = await new SuperFloSolver(wrapper.solutionDescription, this._store).solve();
                break;

        }

        if (!result) {
            this._calculationCallback.error({
                wrapper: wrapper,
                errorCode: CalculationError.AlgorithmNotImplemented
            });
        }

        this._calculationCallback.next([wrapper, result!]);
    }

    visualizeSolution(solution: ISolution) {
        this._store.dispatch(setCurrentSolution({ solution }));
        this._router.navigate(['/visualizer']);
    }

    private _calculationCallback = {
        next: ([wrapper, solution]: [IAlgorithmStatusWrapper, ISolution]) => {
            solution.calculationSource = { staticAlgorithm: wrapper.algorithm.code };
            wrapper.solution = solution;
            wrapper.status = AlgorithmCalculationStatus.Calculated;
            this._store.dispatch(updateAlgorithmSolution({ solution }))
        },
        error: (error: { wrapper: IAlgorithmStatusWrapper, errorCode: CalculationError }) => {
            error.wrapper.status = AlgorithmCalculationStatus.Error;
            error.wrapper.errors.push(error.errorCode);
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
                'available': algorithm.code === Algorithm.AISupportedSolver ? false : true
            });
        }
        const solutions = await selectSnapshot(this._store.select(selectSolutions));
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