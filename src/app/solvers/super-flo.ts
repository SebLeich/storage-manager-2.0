import { v4 as generateGuid } from 'uuid';
import { Store } from "@ngrx/store";
import { selectSnapshot } from "src/lib/process-builder/globals/select-snapshot";
import { MinimizationFunction } from "../globals";
import { ISolver } from "../interfaces";
import { ISolution } from "../interfaces/i-solution.interface";
import { IStep } from "../interfaces/i-step.interface";
import { IVirtualDimension } from "../interfaces/i-virtual-dimension.interface";
import { DataService } from "../services/data.service";
import { Solver } from "./solver";

import * as fromICalculationContextState from 'src/app/store/reducers/i-calculation-context.reducers';
import * as fromIGroupState from 'src/app/store/reducers/i-group.reducers';
import * as fromIOrderState from 'src/app/store/reducers/i-order.reducers';
import * as fromISolutionState from 'src/app/store/reducers/i-solution.reducers';
import { selectCalculationContextValid, selectContainerHeight, selectContainerWidth } from "../store/selectors/i-calculation-context.selectors";
import { selectOrders } from "../store/selectors/i-order.selectors";
import { selectGroups } from "../store/selectors/i-group.selectors";
import { IGood } from '../interfaces/i-good.interface';
import { setCurrentSolution } from '../store/actions/i-solution.actions';

export class SuperFloSolver extends Solver implements ISolver {

    private _unusedDimensions: IVirtualDimension[] = [];

    constructor(
        private _description: string = 'SuperFlo',
        private _minimizationFunction: MinimizationFunction = MinimizationFunction.MIN_Z,
        private _solutionStore: Store<fromISolutionState.State>,
        private _groupStore: Store<fromIGroupState.State>,
        private _orderStore: Store<fromIOrderState.State>,
        private _calculationContextStore: Store<fromICalculationContextState.State>,
    ) {
        super();
    }

    async solve(): Promise<ISolution | undefined> {

        const calculationContextValid = await selectSnapshot(this._calculationContextStore.select(selectCalculationContextValid));
        if (!calculationContextValid) {
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
        } as ISolution;
        let sequenceNumber = 0;

        for (let order of orders) {
            for (let i = 0; i < (order.quantity ?? 0); i++) {
                let space = this.getBestIVirtualDimensionsForMinimizationFunction(this._unusedDimensions.filter(x => this.canPlaceOrderIntoSpace(order, x).notTurned), this._minimizationFunction);
                if (!space) {
                    continue;
                }
                let unusedDimensions = this.putOrderAndCreateIVirtualDimensions(order, space);
                this._unusedDimensions.push(...unusedDimensions);
                this._unusedDimensions.splice(this._unusedDimensions.findIndex(x => x === space), 1);
                const good: IGood = {
                    id: generateGuid(),
                    xCoord: space.xCoord,
                    yCoord: space.yCoord,
                    zCoord: space.zCoord,
                    sequenceNr: sequenceNumber,
                    desc: order.description,
                    height: order.height,
                    width: order.width,
                    length: order.length,
                    stackedOnGood: null
                }
                solution.steps!.push({
                    sequenceNumber: sequenceNumber,
                    messages: [`put good ${good.id} into space (${space.xCoord}/${space.yCoord}/${space.zCoord}) (order ${order.id} element ${i + 1})`],
                    unusedDimensions: unusedDimensions,
                    dimension: DataService.getGoodDimension(good),
                    usedDimension: space
                } as IStep);
                solution.container!.goods.push(good);
                sequenceNumber++;
                let combinable = this.getCombinableSpacePairs(this._unusedDimensions, true);
                while (combinable.length > 0) {
                    let combined = this.combineSpaces(combinable[0]);
                    let spaces = [...this._unusedDimensions.filter(x => combinable[0].indexOf(x) === -1), combined];
                    this._unusedDimensions = spaces;
                    solution.steps!.push({
                        sequenceNumber: sequenceNumber,
                        messages: [`combined unused spaces: ${combinable[0].map(x => x.id).join(', ')}`],
                        unusedDimensions: [combined]
                    } as IStep);
                    sequenceNumber++;
                    combinable = this.getCombinableSpacePairs(this._unusedDimensions, true);
                }
            }
        }
        solution.container!.length = Math.max(...solution.container!.goods.map(good => good.zCoord + good.length), 0);
        solution.groups = groups;
        this._solutionStore.dispatch(setCurrentSolution({ solution }));
    }

}