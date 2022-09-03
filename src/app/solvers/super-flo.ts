import { combineLatest, Observable, ReplaySubject, throwError } from "rxjs";
import { switchMap, take } from "rxjs/operators";
import { SolutionEntity } from "../classes/solution.class";
import { CalculationError } from "../components/main/calculation/enumerations/calculation-error";
import { MinimizationFunction } from "../globals";
import { ISolver } from "../interfaces";
import { IStep } from "../interfaces/i-step.interface";
import { IVirtualDimension } from "../interfaces/i-virtual-dimension.interface";
import { DataService } from "../services/data.service";
import { Solver } from "./solver";

export class SuperFloSolver extends Solver implements ISolver {

    private _unusedDimensions: IVirtualDimension[] = [];

    constructor(
        private _dataService: DataService,
        private _description: string = 'SuperFlo',
        private _minimizationFunction: MinimizationFunction = MinimizationFunction.MIN_Z
    ) {
        super();
    }

    solve(): Observable<SolutionEntity> {
        return this._dataService.containerValid$.pipe(
            switchMap((valid: boolean) => {
                if (!valid) return throwError(CalculationError.ContainerNotReady);
                let subject = new ReplaySubject<SolutionEntity>(1);
                combineLatest([this._dataService.orders$, this._dataService.containerHeight$, this._dataService.containerWidth$, this._dataService.groups$])
                    .pipe(take(1))
                    .subscribe(([orders, height, width, groups]) => {
                        let solution = new SolutionEntity(generateGuid(), this._description);
                        solution.container = new Container(height, width, 0);
                        this._unusedDimensions.push(solution.container.getUnusedDimension());
                        let sequenceNumber = 0;
                        for (let order of orders) {
                            for (let i = 0; i < order.quantity; i++) {
                                let space = this.getBestUnusedDimensionsForMinimizationFunction(this._unusedDimensions.filter(x => this.canPlaceOrderIntoSpace(order, x).notTurned), this._minimizationFunction);
                                if (!space) {
                                    continue;
                                }
                                let unusedDimensions = this.putOrderAndCreateUnusedDimensions(order, space);
                                this._unusedDimensions.push(...unusedDimensions);
                                this._unusedDimensions.splice(this._unusedDimensions.findIndex(x => x === space), 1);
                                let good = new Good(sequenceNumber + 1, space?.xCoord, space?.yCoord, space?.zCoord, sequenceNumber, order.description);
                                good.setOrderDimensions(order);
                                solution.steps.push({
                                    sequenceNumber: sequenceNumber,
                                    messages: [`put good ${good.id} into space (${space.xCoord}/${space.yCoord}/${space.zCoord}) (order ${order.orderId} element ${i + 1})`],
                                    unusedDimensions: unusedDimensions,
                                    dimension: DataService.getGoodDimension(good),
                                    usedDimension: space
                                } as IStep);
                                solution.container.goods.push(good);
                                sequenceNumber++;
                                let combinable = this.getCombinableSpacePairs(this._unusedDimensions, true);
                                while (combinable.length > 0) {
                                    let combined = this.combineSpaces(combinable[0]);
                                    let spaces = [...this._unusedDimensions.filter(x => combinable[0].indexOf(x) === -1), combined];
                                    this._unusedDimensions = spaces;
                                    solution.steps.push({
                                        sequenceNumber: sequenceNumber,
                                        messages: [`combined unused spaces: ${combinable[0].map(x => x.guid).join(', ')}`],
                                        unusedDimensions: [combined],
                                        dimension: null,
                                        usedDimension: null
                                    } as IStep);
                                    sequenceNumber++;
                                    combinable = this.getCombinableSpacePairs(this._unusedDimensions, true);
                                }
                            }
                        }
                        solution.container.length = Math.max(...solution.container.goods.map(x => x.z + x.length), 0);
                        solution.groups = groups;
                        this._dataService.setCurrentSolution(solution);
                        subject.next(solution);
                        subject.complete();
                    });
                return subject.asObservable();
            })
        ) as Observable<SolutionEntity>;
    }

}