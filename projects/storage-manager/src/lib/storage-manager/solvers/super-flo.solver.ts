import { v4 as generateGuid } from 'uuid';
import { Solver } from './solver';
import { IPossibilities } from '@smgr/interfaces';
import moment from 'moment';
import { ISolver } from 'src/lib/storage-manager/interfaces/solver.interface';
import { Algorithm } from 'src/app/globals';
import { Solution } from '../types/solution.type';
import { SolutionWrapper } from '../types/solution-wrapper.type';
import { CalculationStep } from '../types/calculation-step.type';
import { Group } from '../types/group.type';
import { Order } from '../types/order.type';
import { UnusedPosition } from '../types/unused-position.type';
import { ThreeDCalculationService } from '@/lib/shared/services/three-d-calculation.service';
import { Identifiable } from '../types/identifiable.type';
import { Good } from '../types/good.type';

export class SuperFloSolver extends Solver implements ISolver {

    constructor(private _description: string = 'SuperFlo') {
        super();
    }

    public solve(containerHeight: number, containerWidth: number, groups: Group[], orders: Order[]): SolutionWrapper {

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
                length: Infinity,
                goods: [],
                unit: 'mm'
            },
            steps: [],
            calculated: moment().format(),
            calculationSource: {
                title: this._description,
                staticAlgorithm: Algorithm.SuperFlo
            }
        } as Solution,
            calculationSteps: CalculationStep[] = [];

        const containerPosition = ThreeDCalculationService.calculateSpatialPosition(solution.container);
        const unusedPosition = ThreeDCalculationService.spatialPositionedToUnusedPosition(containerPosition);
        let positions: (UnusedPosition & Identifiable)[] = [{ ...unusedPosition, id: generateGuid() }],
            positionBacklog: UnusedPosition[] = [ThreeDCalculationService.spatialPositionedToUnusedPosition(containerPosition)],
            sequenceNumber = 1;

        for (const group of groups) {

            const groupOrders = orders
                .filter(order => order.group === group.id)
                .sort((order1, order2) => {
                    const a1 = order1.length * order1.width;
                    const a2 = order2.length * order2.width;
                    return a1 < a2 ? 1 : -1;
                });

            for (const order of groupOrders) {

                for (let i = 0; i < (order.quantity ?? 0); i++) {

                    const index = Math.max(...positions.map(virtualDimension => virtualDimension.index ?? 0));
                    const addOrderResult = this.addOrder(order, group, positions, index, positionBacklog);
                    if (addOrderResult === false) {
                        continue;
                    }

                    positions = [...positions.filter(position => position.id !== addOrderResult.usedPosition?.id), ...addOrderResult.positions];
                    positionBacklog = [...positionBacklog, ...addOrderResult.positions];
                    solution.container.goods
                        .push({
                            ...addOrderResult.usedPosition,
                            desc: order.description,
                            group: order.group,
                            stackedOnGood: null,
                            sequenceNr: sequenceNumber,
                            id: generateGuid(),
                            stackingAllowed: order.stackingAllowed,
                            turningAllowed: order.turningAllowed,
                            turned: addOrderResult.usedPosition?.rotated,
                            orderGuid: order.id
                        } as Good);

                    calculationSteps.push({ ...addOrderResult, sequenceNumber: sequenceNumber });
                    sequenceNumber++;

                    const mergingResult = this.mergePositions(positions, sequenceNumber);
                    positions = mergingResult.positions;
                    sequenceNumber = mergingResult.sequenceNumber;
                    calculationSteps.push(...mergingResult.steps);
                }
            }
        }

        solution.container.length = Math.max(...solution.container.goods.map(good => good.zCoord + good.length), 0);

        return { solution, calculationSteps, groups, orders, products: [] };
    }

    private addOrder(order: Order, orderGroup: Group, availablePositions: (UnusedPosition & Identifiable)[], index: number, positionBacklog: UnusedPosition[]): false | (CalculationStep & { usedPosition: (UnusedPosition & Identifiable) }) {
        const possibilities: IPossibilities = {
            notRotated: availablePositions
                .filter(availablePosition => {
                    return availablePosition.height >= order.height
                        && availablePosition.width >= order.width
                        && availablePosition.length >= order.length
                        && (order.stackingAllowed || availablePosition.yCoord === 0)
                        && (availablePosition.groupRestrictedBy == null || orderGroup.sequenceNumber == null || availablePosition.groupRestrictedBy <= orderGroup.sequenceNumber)
                }),
            rotated: []
        }

        if (order.turningAllowed) {
            possibilities.rotated = availablePositions
                .filter(availablePosition => {
                    return availablePosition.height > order.height
                        && availablePosition.width > order.length
                        && availablePosition.length > order.width
                        && (order.stackingAllowed || availablePosition.yCoord === 0)
                        && (availablePosition.groupRestrictedBy == null || orderGroup.sequenceNumber == null || availablePosition.groupRestrictedBy <= orderGroup.sequenceNumber)
                })
                .map(virtualDimension => {
                    return {
                        ...virtualDimension,
                        rotated: true
                    };
                })
        }

        if (possibilities.notRotated.length === 0 && possibilities.rotated.length === 0) {
            return false;
        }

        const bestPosition = this.getOptimalPosition(possibilities);
        const putted = this.putOrderIntoPosition(order, orderGroup.sequenceNumber!, bestPosition, index);

        const recursiveGroupRestricted: UnusedPosition[] = [];
        for (let position of availablePositions.filter(availablePosition => availablePosition.zCoord < bestPosition.zCoord && (availablePosition.groupRestrictedBy == null || availablePosition.groupRestrictedBy < orderGroup.sequenceNumber!))) {

            const overlapping = this.positionIsBehindOrInfrontFirstPosition(bestPosition, position);
            if (overlapping) {
                position.groupRestrictedBy = bestPosition.groupRestrictedBy;
                recursiveGroupRestricted.push(position);
            }
        }

        return {
            sequenceNumber: index,
            messages: putted.messages,
            usedPosition: bestPosition,
            positions: putted.createdPositions,
        };
    }

    private getOptimalPosition(possibilities: IPossibilities): (UnusedPosition & Identifiable) {
        const minResult1 = [...possibilities.notRotated].sort((p1, p2) => this.minimizationFunction1(p1, p2))[0];
        //const minResult2 = [...possibilities.notRotated, ...possibilities.rotated].sort((p1, p2) => this.minimizationFunction2(p1, p2));
        //return minResult1.zCoord > minResult2.zCoord ? minResult2 : minResult1;
        return minResult1;
    }

    private mergePositions(availablePositions: (UnusedPosition & Identifiable)[], startingSequenceNumber: number) {
        let positions = [...availablePositions];
        const steps: CalculationStep[] = [];
        let found = true;
        let sequenceNumber = startingSequenceNumber;

        while (found) {

            found = false;
            let mergedPosition: (UnusedPosition & Identifiable) | false = false;

            for (const position of positions) {

                if (mergedPosition) {
                    break;
                }
                for (const candidate of positions) {

                    if (candidate === position) continue;

                    mergedPosition = this.mergeIfPossible(position, candidate);
                    if (mergedPosition) {
                        steps.push({
                            positions: [mergedPosition],
                            messages: [`merged positions to new position`],
                            sequenceNumber: sequenceNumber
                        });
                        sequenceNumber++;

                        const filteredPositions = positions.filter(currentPosition => currentPosition !== position && currentPosition !== candidate);
                        positions = [...filteredPositions, mergedPosition];
                        break;
                    }
                }
            }

            if (mergedPosition) {
                found = true;
            }
        }

        return { positions, steps, sequenceNumber };
    }

    private minimizationFunction1(position1: UnusedPosition, position2: UnusedPosition) {
        if (position1.zCoord === position2.zCoord) {
            return position1.xCoord > position2.xCoord ? 1 : -1;
        }
        return position1.zCoord > position2.zCoord ? 1 : -1;
    }

    private minimizationFunction2(position1: UnusedPosition, position2: UnusedPosition, orderWidth: number, orderLength: number) {
        const position1Rest = position1.width % orderWidth;
        const position2Rest = position2.width % orderWidth;
        if (position1Rest === position2Rest) {
            return position1.fCoord > position2.fCoord;
        }
        return position1Rest > position2Rest ? 1 : -1;
    }

    private putOrderIntoPosition(order: Order, orderGroup: number, position: UnusedPosition, start: number) {
        let index = start;
        let groupRestrictedBy = orderGroup;
        if (position.groupRestrictedBy && position.groupRestrictedBy < groupRestrictedBy) {
            groupRestrictedBy = position.groupRestrictedBy;
        }

        let messages: string[] = [];

        const diff = {
            x: position.rotated ? position.width - order.length : position.width - order.width,
            y: position.height - order.height,
            z: position.rotated ? position.length - order.width : position.length - order.length
        };

        let createdPositions: (UnusedPosition & Identifiable)[] = [];

        if (diff.y > 0 && order.stackingAllowed) {
            index++;
            const addPosition = {
                ...position,
                id: generateGuid(),
                fCoord: position.zCoord + order.length,
                yCoord: position.yCoord + order.height,
                height: diff.y,
                length: order.length,
                index: index,
                groupRestrictedBy: orderGroup,
                width: order.width,
                rCoord: position.xCoord + order.width
            };

            createdPositions.push(addPosition);
            messages.push(`added space at (${addPosition.xCoord}, ${addPosition.yCoord}, ${addPosition.zCoord}) | w: ${addPosition.width}, h: ${addPosition.height}, l: ${addPosition.length}`);
        }
        if (diff.x > 0) {
            index++;
            const addPosition = {
                ...position,
                id: generateGuid(),
                width: diff.x,
                length: order.length,
                xCoord: position.xCoord + order.width,
                fCoord: order.length + position.zCoord,
                index: index,
                groupRestrictedBy: groupRestrictedBy,
            };
            createdPositions.push(addPosition);
            messages.push(`added space at (${addPosition.xCoord}, ${addPosition.yCoord}, ${addPosition.zCoord}) | w: ${addPosition.width}, h: ${addPosition.height}, l: ${addPosition.length}`);
        }
        if (diff.z > 0) {
            index++;
            const addPosition = {
                ...position,
                id: generateGuid(),
                zCoord: position.zCoord + order.length,
                index: index,
                groupRestrictedBy: groupRestrictedBy,
                length: diff.z
            };
            createdPositions.push(addPosition);
            messages.push(`added space at (${addPosition.xCoord}, ${addPosition.yCoord}, ${addPosition.zCoord}) | w: ${addPosition.width}, h: ${addPosition.height}, l: ${addPosition.length}`);
        }

        const goodPosition = {
            ...position,
            id: generateGuid(),
            fCoord: position.fCoord === Infinity || diff.z === Infinity ? Infinity : position.fCoord - diff.z,
            rCoord: position.rCoord - diff.x,
            tCoord: position.tCoord - diff.y,
            height: order.height,
            width: order.width,
            length: order.length
        }

        return { createdPositions, messages, goodPosition };
    }

    private positionIsBehindOrInfrontFirstPosition(firstPosition: UnusedPosition, position: UnusedPosition): boolean {
        if ((firstPosition.tCoord <= position.yCoord) || (firstPosition.yCoord >= position.tCoord)) return false;
        if ((firstPosition.rCoord <= position.xCoord) || (firstPosition.xCoord >= position.rCoord)) return false;
        return true;
    }

    private mergeIfPossible(source: UnusedPosition, candidate: UnusedPosition): false | UnusedPosition & Identifiable {
        if (
            source.yCoord === candidate.yCoord &&
            source.xCoord === candidate.xCoord &&
            source.rCoord === candidate.rCoord &&
            source.tCoord === candidate.tCoord
        ) {
            // positions in line
            if (source.zCoord === candidate.fCoord) {

                // candidate right behind position
                return {
                    ...source,
                    id: generateGuid(),
                    groupRestrictedBy: source.groupRestrictedBy,
                    length: source.length + candidate.length,
                    rotated: false,
                    zCoord: candidate.zCoord,
                    fCoord: candidate.zCoord + source.length + candidate.length
                };
            }
            if (source.fCoord === candidate.zCoord) {

                // candidate right infornt position
                return {
                    ...source,
                    id: generateGuid(),
                    groupRestrictedBy: candidate.groupRestrictedBy,
                    length: source.length + candidate.length,
                    rotated: false,
                    fCoord: candidate.fCoord
                }
            }
        }

        if (
            source.yCoord === candidate.yCoord &&
            source.zCoord === candidate.zCoord &&
            source.fCoord === candidate.fCoord &&
            source.tCoord === candidate.tCoord
        ) {
            // positions in row
            // more restricter group restriction
            if (source.rCoord === candidate.xCoord) {

                // candidate right to position
                return {
                    ...source,
                    id: generateGuid(),
                    width: source.width + candidate.width,
                    rotated: false,
                    rCoord: candidate.rCoord
                };
            }
            if (source.xCoord === candidate.rCoord) {

                // candidate left to position
                return {
                    ...source,
                    id: generateGuid(),
                    width: source.width + candidate.width,
                    rotated: false,
                    xCoord: candidate.xCoord
                }
            }
        }

        if (
            source.xCoord === candidate.xCoord &&
            source.zCoord === candidate.zCoord &&
            source.fCoord === candidate.fCoord &&
            source.rCoord === candidate.rCoord
        ) {
            // positions stacked
            if (source.tCoord === candidate.yCoord) {

                // candidate right above position
                // more restricter group restriction
                return {
                    ...source,
                    id: generateGuid(),
                    height: source.height + candidate.height,
                    rotated: false,
                    tCoord: candidate.tCoord
                };
            }
            if (source.yCoord === candidate.tCoord) {

                // candidate right below position
                return {
                    ...source,
                    id: generateGuid(),
                    height: source.height + candidate.height,
                    rotated: false,
                    yCoord: candidate.yCoord
                }
            }
        }

        return false;
    }

}