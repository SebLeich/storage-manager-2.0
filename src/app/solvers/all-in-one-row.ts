import { v4 as generateGuid } from 'uuid';
import { ISolver } from "../interfaces";
import { Solver } from "./solver";
import { ISolution } from "../../lib/storage-manager-store/interfaces/solution.interface";
import * as moment from 'moment';
import { IGood } from "../../lib/storage-manager-store/interfaces/good.interface";
import { Algorithm } from '../globals';
import { IOrder } from 'src/lib/storage-manager-store/interfaces/order.interface';
import { IGroup } from 'src/lib/storage-manager-store/interfaces/group.interface';

export class AllInOneRowSolver extends Solver implements ISolver {

    constructor(private _description: string = 'All In One Row') {
        super();
    }

    public solve(containerHeight: number, containerWidth: number, groups: IGroup[], orders: IOrder[]): ISolution {

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
                goods: [],
                unit: 'mm'
            },
            groups: groups,
            algorithm: this._description,
            calculated: moment().format(),
            calculationSource: {
                staticAlgorithm: Algorithm.AllInOneRow,
                title: this._description
            },
            steps: []
        } as ISolution;
        let currentPosition = { x: 0, y: 0, z: 0 };
        let sequenceNumber = 0;

        for (const group of groups) {
            const groupOrders = orders.filter(order => order.group === group.id);

            for (let order of groupOrders) {
                for (let i = 0; i < order.quantity!; i++) {
                    const good: IGood = {
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
                        orderGuid: order.id
                    };
                    solution.container!.goods.push(good);
                    sequenceNumber++;
                    currentPosition.z += order.length;
                    solution.container!.length += order.length;
                }
            }
        }

        return solution;
    }

}