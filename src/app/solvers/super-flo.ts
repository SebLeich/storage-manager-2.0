import { combineLatest, Observable, ReplaySubject, throwError } from "rxjs";
import { switchMap, take } from "rxjs/operators";
import { Container, Good, Solution, Step, UnusedDimension } from "../classes";
import { CALCULATION_ERROR } from "../components/main/calculation/calculation-component.classes";
import { generateGuid, MinimizationFunction } from "../globals";
import { ISolver } from "../interfaces";
import { DataService } from "../services/data.service";
import { Solver } from "./solver";

export class SuperFloSolver extends Solver implements ISolver {

    private _unusedDimensions: UnusedDimension[] = [];

    constructor(
        private _dataService: DataService,
        private _description: string = 'SuperFlo',
        private _minimizationFunction: MinimizationFunction = MinimizationFunction.MIN_Z
    ) {
        super();
    }

    solve(): Observable<Solution> {
        return this._dataService.containerValid$.pipe(
            switchMap((valid: boolean) => {
                if (!valid) return throwError(CALCULATION_ERROR.CONTAINER_NOT_READY);
                let subject = new ReplaySubject<Solution>(1);
                combineLatest([this._dataService.orders$, this._dataService.containerHeight$, this._dataService.containerWidth$, this._dataService.groups$])
                    .pipe(take(1))
                    .subscribe(([orders, height, width, groups]) => {
                        let solution = new Solution(generateGuid(), this._description);
                        solution._Container = new Container(height, width, 0);
                        this._unusedDimensions.push(solution._Container.getUnusedDimension());
                        let sequenceNumber = 0;
                        for (let order of orders) {
                            for (let i = 0; i < order.quantity; i++) {
                                let space = this.getBestUnusedDimensionsForMinimizationFunction(this._unusedDimensions.filter(x => this.canPlaceOrderIntoSpace(order, x).notTurned), this._minimizationFunction);
                                let unusedDimensions = this.putOrderAndCreateUnusedDimensions(order, space);
                                this._unusedDimensions.push(...unusedDimensions);
                                this._unusedDimensions.splice(this._unusedDimensions.findIndex(x => x === space), 1);
                                let good = new Good(sequenceNumber+1, space.x, space.y, space.z, sequenceNumber, order.description);
                                good.setOrderDimensions(order);
                                solution._Steps.push({
                                    sequenceNumber: sequenceNumber,
                                    messages: [`put good ${good.id} into space (${space.x}/${space.y}/${space.z}) (order ${order.orderId} element ${i+1})`],
                                    unusedDimensions: unusedDimensions,
                                    dimension: DataService.getGoodDimension(good)
                                } as Step);
                                solution._Container._Goods.push(good);
                                sequenceNumber++;
                            }
                        }
                        solution._Container._Length = Math.max(...solution._Container._Goods.map(x => x.z + x.length), 0);
                        solution._Groups = groups;
                        this._dataService.setCurrentSolution(solution);
                        subject.next(solution);
                        subject.complete();
                    });
                return subject.asObservable();
            })
        ) as Observable<Solution>;
    }

}