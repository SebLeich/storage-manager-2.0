import { combineLatest, Observable, ReplaySubject, throwError } from "rxjs";
import { switchMap, take } from "rxjs/operators";
import { Container, Good, Order, Solution, Space } from "../classes";
import { CALCULATION_ERROR } from "../components/main/calculation/calculation-component.classes";
import { compare, generateGuid } from "../globals";
import { ISolver } from "../interfaces";
import { DataService } from "../services/data.service";
import { Solver } from "./solver";

export class StartLeftBottomSolver extends Solver implements ISolver {

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
                        solution._Container = new Container(height, width, 0);
                        let sequenceNumber = 0, lastGood: Good = null;
                        for (let group of groups) {
                            let currentOrders = orders.filter(x => x.group === group._Id).sort((a, b) => compare(a.length, b.length, false));
                            for (let order of currentOrders) {
                                for (let index = 0; index < order.quantity; index++) {
                                    let position = lastGood === null ? { x: 0, y: 0, z: 0, stackedOn: null } : this._getNextPosition(solution._Container, order, lastGood);
                                    lastGood = new Good(sequenceNumber+1, position.x, position.y, position.z, sequenceNumber, order.description);
                                    lastGood.setOrderDimensions(order);
                                    lastGood.stackedOnGood = position.stackedOn;
                                    lastGood.turned = false;
                                    solution._Container._Goods.push(lastGood);
                                    sequenceNumber++;
                                }
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
        );
    }

    private _getNextPosition(container: Container, order: Order, lastGood: Good): { x: number, y: number, z: number, stackedOn: number } {
        if (lastGood.stackingAllowed && lastGood.length >= order.length && lastGood.width >= order.width && container._Height >= lastGood.y + order.height + lastGood.height) return { x: lastGood.x, y: lastGood.y + lastGood.height, z: lastGood.z, stackedOn: lastGood.id };
        else {
            if (lastGood.stackedOnGood === null) {
                let space = {
                    width: container._Width - lastGood.x - lastGood.width,
                    height: container._Height,
                    length: lastGood.length
                };
                if (super.canPlaceOrderIntoSpace(order, space).notTurned) {
                    return { x: lastGood.x + lastGood.width, y: lastGood.y, z: lastGood.z, stackedOn: null };
                }
            }
            else {
                let underneath = container._Goods.find(x => x.id === lastGood.stackedOnGood);
                while(underneath){
                    let space = {
                        width: underneath.width - lastGood.x - lastGood.width,
                        height: container._Height - underneath.y - underneath.height,
                        length: underneath.length - lastGood.z - lastGood.length
                    };
                    if (super.canPlaceOrderIntoSpace(order, space).notTurned) {
                        return { x: lastGood.x + lastGood.width, y: lastGood.y, z: lastGood.z, stackedOn: underneath.id };
                    }
                    if(typeof underneath.stackedOnGood !== 'number') break;
                    underneath = container._Goods.find(x => x.id === underneath.stackedOnGood);
                }
                if (underneath) {
                    let space = {
                        width: container._Width - underneath.x - underneath.width,
                        height: container._Height,
                        length: underneath.length
                    };
                    if (super.canPlaceOrderIntoSpace(order, space).notTurned) {
                        return { x: underneath.x + underneath.width, y: 0, z: underneath.z, stackedOn: null };
                    }
                }
            }
            return { x: 0, y: 0, z: lastGood.z + lastGood.length, stackedOn: null };
        }
    }

}
