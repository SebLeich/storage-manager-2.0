import { IContainer, IGood, IGroup, IOrder, ISolution } from '@smgr/interfaces';
import moment from 'moment';
import { Algorithm, compare } from 'src/app/globals';
import { v4 as generateGuid } from 'uuid';
import { ISolver } from '../interfaces/solver.interface';
import { Solver } from './solver';

export class StartLeftBottomSolver extends Solver implements ISolver {

    constructor(private _description: string = 'Start Left Bottom') {
        super();
    }

    public solve(containerHeight: number, containerWidth: number, groups: IGroup[], orders: IOrder[]): ISolution {
        const solution: ISolution = {
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
            calculated: moment().format(),
            calculationSource: {
                staticAlgorithm: Algorithm.StartLeftBottom,
                title: this._description
            },
            steps: [],
        };

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
                        group: group.id,
                        turningAllowed: order.turningAllowed,
                        stackingAllowed: order.stackingAllowed,
                        sequenceNr: sequenceNumber,
                        orderGuid: order.id
                    };
                    solution.container!.goods.push(lastGood as IGood);
                    sequenceNumber++;
                }
            }
        }

        solution.container!.length = Math.max(...solution.container!.goods.map(x => x.zCoord + x.length), 0);

        return solution;
    }

    private _getNextPosition(container: IContainer, order: IOrder, lastGood: IGood): { xCoord: number, yCoord: number, zCoord: number, stackedOn: null | string } {
        if (
            lastGood.orderGuid === order.id
            && lastGood.stackingAllowed
            && lastGood.length >= order.length
            && lastGood.width >= order.width
            && container.height >= lastGood.yCoord + order.height + lastGood.height
        ) {
            return { xCoord: lastGood.xCoord, yCoord: lastGood.yCoord + lastGood.height, zCoord: lastGood.zCoord, stackedOn: lastGood.id };
        }
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
                let underneath = container.goods.find((good) => good.id === lastGood.stackedOnGood);
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
                    underneath = container.goods.find((good) => good.id === underneath!.stackedOnGood);
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
