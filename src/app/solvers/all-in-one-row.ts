import { combineLatest, Observable, ReplaySubject, throwError } from "rxjs";
import { switchMap, take } from "rxjs/operators";
import { Good } from "../classes";
import { v4 as generateGuid } from 'uuid';
import { ISolver } from "../interfaces";
import { DataService } from "../services/data.service";
import { Solver } from "./solver";
import { CalculationError } from "../components/main/calculation/enumerations/calculation-error";
import { ISolution } from "../interfaces/i-solution.interface";
import { inject } from "@angular/core";

export class AllInOneRowSolver extends Solver implements ISolver {

    constructor(
        private _description: string = 'All In One Row'
    ) {
        super();
    }

    async solve(): Observable<ISolution> {
        const dataService = inject(DataService);
        return dataService.containerValid$.pipe(
            switchMap((valid: boolean) => {
                if (!valid) return throwError(CalculationError.ContainerNotReady);
                let subject = new ReplaySubject<ISolution>(1);
                combineLatest([this._dataService.orders$, this._dataService.containerHeight$, this._dataService.containerWidth$, this._dataService.descSortedGroups$])
                    .pipe(take(1))
                    .subscribe(([orders, height, width, groups]) => {
                        let solution = { id: generateGuid(), description: this._description } as ISolution;
                        solution.container = { height: height, width: width, length: 0 };
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
        ) as Observable<ISolution>;
    }

}