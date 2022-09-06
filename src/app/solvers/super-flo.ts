import { v4 as generateGuid } from 'uuid';
import { Store } from "@ngrx/store";
import { selectSnapshot } from "src/lib/process-builder/globals/select-snapshot";
import { MinimizationFunction } from "../globals";
import { ISolver } from "../interfaces";
import { ISolution } from "../interfaces/i-solution.interface";
import { IStep } from "../interfaces/i-step.interface";
import { DataService } from "../services/data.service";
import { Solver } from "./solver";

import * as fromICalculationAttributesState from 'src/app/store/reducers/i-calculation-attribute.reducers';
import * as fromIGroupState from 'src/app/store/reducers/i-group.reducers';
import * as fromIOrderState from 'src/app/store/reducers/i-order.reducers';
import * as fromISolutionState from 'src/app/store/reducers/i-solution.reducers';
import { selectCalculationAttributesValid, selectContainerHeight, selectContainerWidth } from "../store/selectors/i-calculation-attribute.selectors";
import { selectOrders } from "../store/selectors/i-order.selectors";
import { selectGroups } from "../store/selectors/i-group.selectors";
import { IGood } from '../interfaces/i-good.interface';
import getContainerVirtualSpace from '../methods/get-container-virtual-space.shared-methods';
import moment from 'moment';

export class SuperFloSolver extends Solver implements ISolver {

    constructor(
        private _description: string = 'SuperFlo',
        private _minimizationFunction: MinimizationFunction = MinimizationFunction.MIN_Z,
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
            steps: [],
            algorithm: this._description,
            calculated: moment().format()
        } as ISolution;
        let sequenceNumber = 0;
        
        let virtualDimensions = [getContainerVirtualSpace(solution.container!)];

        for (let order of orders) {
            for (let i = 0; i < (order.quantity ?? 0); i++) {
                let space = this.getBestIVirtualDimensionsForMinimizationFunction(virtualDimensions.filter(x => this.canPlaceOrderIntoSpace(order, x).notTurned), this._minimizationFunction);
                if (!space) {
                    continue;
                }
                virtualDimensions = [...virtualDimensions, ...this.putOrderAndCreateIVirtualDimensions(order, space)];
                virtualDimensions.splice(virtualDimensions.findIndex(dimension => dimension === space), 1);
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
                    stackedOnGood: null,
                    group: order.group
                }
                solution.steps!.push({
                    sequenceNumber: sequenceNumber,
                    messages: [`put good ${good.id} into space (${space.xCoord}/${space.yCoord}/${space.zCoord}) (order ${order.id} element ${i + 1})`],
                    unusedDimensions: virtualDimensions,
                    dimension: DataService.getGoodDimension(good),
                    usedDimension: space
                } as IStep);
                solution.container!.goods.push(good);
                sequenceNumber++;
                let combinable = this.getCombinableSpacePairs(virtualDimensions, true);
                while (combinable.length > 0) {
                    let combined = this.combineSpaces(combinable[0]);
                    virtualDimensions = [...virtualDimensions.filter(x => combinable[0].indexOf(x) === -1), combined];
                    solution.steps!.push({
                        sequenceNumber: sequenceNumber,
                        messages: [`combined unused spaces: ${combinable[0].map(x => x.id).join(', ')}`],
                        unusedDimensions: [combined]
                    } as IStep);
                    sequenceNumber++;
                    combinable = this.getCombinableSpacePairs(virtualDimensions, true);
                }
            }
        }
        solution.container!.length = Math.max(...solution.container!.goods.map(good => good.zCoord + good.length), 0);
        solution.groups = groups;
        return solution;
    }

}