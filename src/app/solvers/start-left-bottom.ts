import { v4 as generateGuid } from 'uuid';
import { selectSnapshot } from "src/lib/process-builder/globals/select-snapshot";
import { compare } from "../globals";
import { ISolver } from "../interfaces";
import { ISolution } from "../interfaces/i-solution.interface";

import * as fromICalculationAttributesState from 'src/app/store/reducers/i-calculation-attribute.reducers';
import * as fromIGroupState from 'src/app/store/reducers/i-group.reducers';
import * as fromIOrderState from 'src/app/store/reducers/i-order.reducers';
import * as fromISolutionState from 'src/app/store/reducers/i-solution.reducers';

import { Solver } from "./solver";
import { Store } from "@ngrx/store";
import { selectCalculationAttributesValid, selectContainerHeight, selectContainerWidth } from "../store/selectors/i-calculation-attribute.selectors";
import { selectGroups } from "../store/selectors/i-group.selectors";
import { selectOrders } from "../store/selectors/i-order.selectors";
import { IGood } from '../interfaces/i-good.interface';
import { IContainer } from '../interfaces/i-container.interface';
import { IOrder } from '../interfaces/i-order.interface';
import moment from 'moment';

export class StartLeftBottomSolver extends Solver implements ISolver {

    constructor(
        private _description: string = 'Start Left Bottom',
        private _solutionStore: Store<fromISolutionState.State>,
        private _groupStore: Store<fromIGroupState.State>,
        private _orderStore: Store<fromIOrderState.State>,
        private _calculationAttributesStore: Store<fromICalculationAttributesState.State>,
    ) {
        super();
    }

    async solve(): Promise<ISolution | undefined> {

        const calculationAttributesValid = await selectSnapshot(this._calculationAttributesStore.select(selectCalculationAttributesValid));
        if (!calculationAttributesValid) {
            return;
        }

        const containerHeight = await selectSnapshot(this._solutionStore.select(selectContainerHeight));
        const containerWidth = await selectSnapshot(this._solutionStore.select(selectContainerWidth));
        const groups = await selectSnapshot(this._groupStore.select(selectGroups));
        const orders = await selectSnapshot(this._orderStore.select(selectOrders));

        const solution = {
            id: generateGuid(),
            description: this._description,
            container: {
                id: generateGuid(),
                xCoord: 0,
                yCoord: 0,
                zCoord: 0,
                height: containerHeight,
                width: containerWidth,
                length: 0,
                goods: []
            },
            algorithm: this._description,
            calculated: moment().format()
        } as ISolution;
        let sequenceNumber = 0, lastGood: IGood | null = null;

        for (let group of groups) {
            let currentOrders = orders.filter(x => x.group === group.id).sort((a, b) => compare(a.length, b.length, false));
            for (let order of currentOrders) {
                for (let index = 0; index < (order.quantity ?? 0); index++) {
                    let position: { xCoord: number, yCoord: number, zCoord: number, stackedOn: null | string } = lastGood === null ? { xCoord: 0, yCoord: 0, zCoord: 0, stackedOn: null } : this._getNextPosition(solution.container!, order, lastGood);
                    lastGood = {
                        desc: order.description,
                        height: order.height,
                        id: generateGuid(),
                        length: order.length,
                        width: order.width,
                        xCoord: position.xCoord,
                        yCoord: position.yCoord,
                        zCoord: position.zCoord,
                        stackedOnGood: position.stackedOn,
                        turned: false,
                        group: group.id
                    };
                    solution.container!.goods.push(lastGood);
                    sequenceNumber++;
                }
            }
        }
        solution.container!.length = Math.max(...solution.container!.goods.map(x => x.zCoord + x.length), 0);
        solution.groups = groups;
        
        return solution;
    }

    private _getNextPosition(container: IContainer, order: IOrder, lastGood: IGood): { xCoord: number, yCoord: number, zCoord: number, stackedOn: null | string } {
        if (lastGood.stackingAllowed && lastGood.length >= order.length && lastGood.width >= order.width && container.height >= lastGood.yCoord + order.height + lastGood.height) return { xCoord: lastGood.xCoord, yCoord: lastGood.yCoord + lastGood.height, zCoord: lastGood.zCoord, stackedOn: lastGood.id };
        else {
            if (lastGood.stackedOnGood === null) {
                let space = {
                    width: container.width - lastGood.xCoord - lastGood.width,
                    height: container.height,
                    length: lastGood.length
                };
                if (super.canPlaceOrderIntoSpace(order, space).notTurned) {
                    return { xCoord: lastGood.xCoord + lastGood.width, yCoord: lastGood.yCoord, zCoord: lastGood.zCoord, stackedOn: null };
                }
            }
            else {
                let underneath = container.goods.find(x => x.id === lastGood.stackedOnGood);
                while (underneath) {
                    let space = {
                        width: underneath.width - lastGood.xCoord - lastGood.width,
                        height: container.height - underneath.yCoord - underneath.height,
                        length: underneath.length - lastGood.zCoord - lastGood.length
                    };
                    if (super.canPlaceOrderIntoSpace(order, space).notTurned) {
                        return { xCoord: lastGood.xCoord + lastGood.width, yCoord: lastGood.yCoord, zCoord: lastGood.zCoord, stackedOn: underneath.id };
                    }
                    if (typeof underneath.stackedOnGood !== 'number') break;
                    underneath = container.goods.find(x => x.id === underneath!.stackedOnGood);
                }
                if (underneath) {
                    let space = {
                        width: container.width - underneath.xCoord - underneath.width,
                        height: container.height,
                        length: underneath.length
                    };
                    if (super.canPlaceOrderIntoSpace(order, space).notTurned) {
                        return { xCoord: underneath.xCoord + underneath.width, yCoord: 0, zCoord: underneath.zCoord, stackedOn: null };
                    }
                }
            }
            return { xCoord: 0, yCoord: 0, zCoord: lastGood.zCoord + lastGood.length, stackedOn: null };
        }
    }

}
