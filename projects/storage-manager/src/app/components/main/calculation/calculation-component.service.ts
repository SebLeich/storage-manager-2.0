import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Algorithm, algorithms } from "src/app/globals";
import { ISolution } from "@smgr/interfaces";
import { AllInOneRowSolver } from "src/lib/storage-manager/solvers/all-in-one-row.solver";
import { StartLeftBottomSolver, SuperFloSolver } from "@smgr/solvers";
import { AlgorithmCalculationStatus } from "./enumerations/algorithm-calculation-status.enum";
import { CalculationError } from "./enumerations/calculation-error";
import { IAlgorithmStatusWrapper } from "./interfaces/i-algorithm-calculation-status-wrapper.interface";
import { selectSnapshot } from "src/lib/process-builder/globals/select-snapshot";
import { setCurrentSolution, selectCalculationAttributesValid, selectGroups, selectContainerHeight, selectContainerWidth, selectSolutions, selectOrders, updateAlgorithmSolution } from "@smgr/store";
import { Solution } from "@/lib/storage-manager/types/solution.type";

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

        let result: Solution | undefined;
        const calculationAttributesValid = await selectSnapshot(this._store.select(selectCalculationAttributesValid));
        if (!calculationAttributesValid) {
            this._calculationCallback.error({
                wrapper: wrapper,
                errorCode: CalculationError.AlgorithmNotImplemented
            });
            return;
        }

        const containerHeight = await selectSnapshot(this._store.select(selectContainerHeight));
        const containerWidth = await selectSnapshot(this._store.select(selectContainerWidth));
        const groups = (await selectSnapshot(this._store.select(selectGroups)));
        const orders = await selectSnapshot(this._store.select(selectOrders));

        switch (wrapper.algorithm.code) {

            case Algorithm.AllInOneRow:
                wrapper.status = AlgorithmCalculationStatus.Calculating;
                result = await new AllInOneRowSolver(wrapper.solutionDescription).solve(containerHeight, containerWidth, groups, orders).solution;
                break;

            case Algorithm.StartLeftBottom:
                wrapper.status = AlgorithmCalculationStatus.Calculating;
                result = await new StartLeftBottomSolver(wrapper.solutionDescription).solve(containerHeight, containerWidth, groups, orders).solution;
                break;

            case Algorithm.SuperFlo:
                wrapper.status = AlgorithmCalculationStatus.Calculating;
                result = await new SuperFloSolver(wrapper.solutionDescription).solve(containerHeight, containerWidth, groups, orders).solution;
                break;

        }

        this._calculationCallback.next([wrapper, result as any]);
    }

    visualizeSolution(solution: ISolution) {
        this._store.dispatch(setCurrentSolution({ solution }));
        this._router.navigate(['/visualizer']);
    }

    private _calculationCallback = {
        next: ([wrapper, solution]: [IAlgorithmStatusWrapper, ISolution]) => {
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
            let wrapper = this.algorithms.find(x => x.algorithm.title === solution.calculationSource.title);
            if (wrapper) {
                wrapper.status = AlgorithmCalculationStatus.Calculated;
                wrapper.solution = solution;
            }
        }
    }

}