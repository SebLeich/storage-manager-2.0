import { combineLatest, Observable, ReplaySubject, throwError } from "rxjs";
import { switchMap, take } from "rxjs/operators";
import { Container, Good, Solution } from "../classes";
import { CALCULATION_ERROR } from "../components/main/calculation/calculation-component.classes";
import { generateGuid } from "../globals";
import { ISolver } from "../interfaces";
import { DataService } from "../services/data.service";
import { Solver } from "./solver";

export class AllInOneRowSolver extends Solver implements ISolver {

    constructor(
        private _dataService: DataService,
        private _description: string = 'All In One Row'
    ) {
        super();
    }

    solve(): Observable<Solution> {
        return this._dataService.containerValid$.pipe(
            switchMap((valid: boolean) => {
                if (!valid) return throwError(CALCULATION_ERROR.CONTAINER_NOT_READY);
                let subject = new ReplaySubject<Solution>(1);
                combineLatest([this._dataService.orders$, this._dataService.containerHeight$, this._dataService.containerWidth$, this._dataService.descSortedGroups$])
                    .pipe(take(1))
                    .subscribe(([orders, height, width, groups]) => {
                        let solution = new Solution(generateGuid(), this._description);
                        solution.container = new Container(height, width, 0);
                        let currentPosition = { x: 0, y: 0, z: 0 };
                        let sequenceNumber = 0;
                        for (let group of groups) {
                            for (let order of orders.filter(x => x.group === group.id)) {
                                for (let i = 0; i < order.quantity; i++) {
                                    let good = new Good(sequenceNumber + 1, currentPosition.x, currentPosition.y, currentPosition.z, sequenceNumber, order.description);
                                    good.setOrderDimensions(order);
                                    solution.container.goods.push(good);
                                    sequenceNumber++;
                                    currentPosition.z += order.length;
                                    solution.container.length += order.length;
                                }
                            }
                        }
                        solution.groups = groups;
                        this._dataService.setCurrentSolution(solution);
                        subject.next(solution);
                        subject.complete();
                    });
                return subject.asObservable();
            })
        ) as Observable<Solution>;
    }

}