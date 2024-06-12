import moment from 'moment';
import { v4 as generateGuid } from 'uuid';
import { Algorithm } from '../../../app/globals';
import { ISolver } from '../interfaces/solver.interface';
import { Solver } from "./solver";
import { Group } from '../types/group.type';
import { Order } from '../types/order.type';
import { SolutionWrapper } from '../types/solution-wrapper.type';
import { Solution } from '../types/solution.type';
import { Good } from '../types/good.type';
import { CalculationStep } from '../types/calculation-step.type';

export class AllInOneRowSolver extends Solver implements ISolver {

    constructor(private _description: string = 'All In One Row') {
        super();
    }

    public solve(containerHeight: number, containerWidth: number, groups: Group[], orders: Order[]): SolutionWrapper {

        const solution: Solution = {
            description: this._description,
            container: {
                id: generateGuid(),
                xCoord: 0,
                yCoord: 0,
                zCoord: 0,
                height: containerHeight,
                width: containerWidth,
                length: 0,
                goods: [],
                unit: 'mm'
            },
            calculated: moment().format(),
            calculationSource: {
                staticAlgorithm: Algorithm.AllInOneRow,
                title: this._description
            },
        }, calculationSteps: CalculationStep[] = [];

        let currentPosition = { x: 0, y: 0, z: 0 };
        let sequenceNumber = 0;

        for (const group of groups) {
            const groupOrders = orders.filter(order => order.group === group.id);

            for (let order of groupOrders) {
                for (let i = 0; i < order.quantity!; i++) {
                    const good: Good = {
                        id: generateGuid(),
                        xCoord: currentPosition.x,
                        yCoord: currentPosition.y,
                        zCoord: currentPosition.z,
                        sequenceNr: sequenceNumber,
                        desc: order.description,
                        height: order.height,
                        width: order.width,
                        length: order.length,
                        stackedOnGood: null,
                        turned: false,
                        group: group.id,
                        stackingAllowed: order.stackingAllowed,
                        turningAllowed: order.turningAllowed,
                        orderGuid: order.id,
                        texture: order.texture ?? 'cardboard'
                    };
                    solution.container!.goods.push(good);
                    sequenceNumber++;
                    currentPosition.z += order.length;
                    solution.container!.length += order.length;
                }
            }
        }

        return { solution, groups, orders, products: [], calculationSteps: [] };
    }

}