import { v4 as generateGuid } from 'uuid';
import { Store } from "@ngrx/store";
import { selectSnapshot } from "src/lib/process-builder/globals/select-snapshot";
import { ISolver } from "../interfaces";
import { ISolution } from "../interfaces/i-solution.interface";
import { Solver } from "./solver";

import { selectCalculationAttributesValid, selectContainerHeight, selectContainerWidth } from "../store/selectors/i-calculation-attribute.selectors";
import { selectOrders } from "../store/selectors/i-order.selectors";
import { selectGroups } from "../store/selectors/i-group.selectors";

import getContainerPosition from '../methods/get-container-position.shared-methods';
import moment from 'moment';
import { IOrder } from '../interfaces/i-order.interface';
import { IGroup } from '../interfaces/i-group.interface';
import { IPosition } from '../interfaces/i-position.interface';
import { IPossibilities } from '../interfaces/i-possibilities.interface';
import { IStep } from '../interfaces/i-step.interface';
import { IGood } from '../interfaces/i-good.interface';
import { Algorithm } from '../globals';

export class SuperFloSolver extends Solver implements ISolver {

    constructor(
        private _description: string = 'SuperFlo',
        private _store: Store,
    ) {
        super();
    }

    async solve(): Promise<ISolution | undefined> {

        const calculationAttributesValid = await selectSnapshot(this._store.select(selectCalculationAttributesValid));
        if (!calculationAttributesValid) {
            return;
        }

        const containerHeight = await selectSnapshot(this._store.select(selectContainerHeight));
        const containerWidth = await selectSnapshot(this._store.select(selectContainerWidth));
        const groups = (await selectSnapshot(this._store.select(selectGroups)));
        const orders = await selectSnapshot(this._store.select(selectOrders));

        let solution = {
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
                goods: []
            },
            steps: [],
            calculated: moment().format(),
            calculationSource: {
                title: this._description,
                staticAlgorithm: Algorithm.SuperFlo
            }
        } as ISolution;

        const containerPosition = getContainerPosition(solution.container!);
        let positions: IPosition[] = [containerPosition];
        let positionBacklog: IPosition[] = [containerPosition];
        let sequenceNumber = 1;

        for (let group of groups) {

            const groupOrders = orders
                .filter(order => order.group === group.id)
                .sort((order1, order2) => {
                    const a1 = order1.length * order1.width;
                    const a2 = order2.length * order2.width;
                    return a1 < a2 ? 1 : -1;
                });

            for (let order of groupOrders) {

                for (let i = 0; i < (order.quantity ?? 0); i++) {

                    const index = Math.max(...positions.map(virtualDimension => virtualDimension.index ?? 0));
                    const addOrderResult = this.addOrder(order, group, positions, index, positionBacklog);
                    if (addOrderResult === false) {
                        continue;
                    }

                    positions = [...positions.filter(position => position.id !== addOrderResult.usedPosition!.id), ...addOrderResult.createdPositions!];
                    positionBacklog = [...positionBacklog, ...addOrderResult.createdPositions];
                    solution.container!.goods.push({
                        ...addOrderResult.placedAtPosition,
                        desc: order.description,
                        group: order.group,
                        stackedOnGood: null,
                        sequenceNr: sequenceNumber,
                        id: generateGuid(),
                        stackingAllowed: order.stackingAllowed,
                        turningAllowed: order.turningAllowed,
                        turned: addOrderResult.placedAtPosition?.rotated,
                        orderGuid: order.id
                    } as IGood);
                    solution.steps!.push({ ...addOrderResult, sequenceNumber: sequenceNumber });
                    sequenceNumber++;

                    const mergingResult = this.mergePositions(positions, sequenceNumber);
                    positions = mergingResult.positions;
                    sequenceNumber = mergingResult.sequenceNumber;
                    solution.steps! = [...solution.steps!, ...mergingResult.steps];
                }
            }
        }

        solution.container!.length = Math.max(...solution.container!.goods.map(good => good.zCoord + good.length), 0);
        return solution;
    }

    private addOrder(order: IOrder, orderGroup: IGroup, availablePositions: IPosition[], index: number, positionBacklog: IPosition[]): false | IStep {
        let possibilities: IPossibilities = {
            notRotated: availablePositions
                .filter(availablePosition => {
                    return availablePosition.height >= order.height
                        && availablePosition.width >= order.width
                        && availablePosition.length >= order.length
                        && (order.stackingAllowed || availablePosition.yCoord === 0)
                        && (availablePosition.groupRestrictedBy == null || orderGroup.sequenceNumber == null || availablePosition.groupRestrictedBy <= orderGroup.sequenceNumber)
                }),
            rotated: [] as IPosition[]
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
        const putted = this.putOrderIntoPosition(order, orderGroup.sequenceNumber!, bestPosition, index, positionBacklog);

        const recursiveGroupRestricted: IPosition[] = [];
        for (let position of availablePositions.filter(availablePosition => availablePosition.zCoord < bestPosition.zCoord && (availablePosition.groupRestrictedBy == null || availablePosition.groupRestrictedBy < orderGroup.sequenceNumber!))) {

            const overlapping = this.positionIsBehindOrInfrontFirstPosition(bestPosition, position);
            if (overlapping) {
                position.groupRestrictedBy = bestPosition.groupRestrictedBy;
                recursiveGroupRestricted.push(position);
            }
        }

        return {
            messages: putted.messages,
            usedPosition: bestPosition,
            placedAtPosition: putted.goodPosition,
            createdPositions: putted.createdPositions,
        };
    }

    private getOptimalPosition(possibilities: IPossibilities) {
        const minResult1 = [...possibilities.notRotated].sort((p1, p2) => this.minimizationFunction1(p1, p2))[0];
        //const minResult2 = [...possibilities.notRotated, ...possibilities.rotated].sort((p1, p2) => this.minimizationFunction2(p1, p2));
        //return minResult1.zCoord > minResult2.zCoord ? minResult2 : minResult1;
        return minResult1;
    }

    private mergePositions(availablePositions: IPosition[], startingSequenceNumber: number) {
        var positions = [...availablePositions];
        var steps: IStep[] = [];
        var found = true;
        var sequenceNumber = startingSequenceNumber;

        while (found) {

            found = false;
            let mergedPosition: IPosition | false = false;

            for (let position of positions) {

                if (mergedPosition) {
                    break;
                }
                for (let candidate of positions) {

                    if (candidate === position) continue;

                    mergedPosition = this.mergeIfPossible(position, candidate);
                    if (mergedPosition) {
                        steps.push({
                            createdPositions: [mergedPosition],
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

    private minimizationFunction1(position1: IPosition, position2: IPosition) {
        if (position1.zCoord === position2.zCoord) {
            return position1.xCoord > position2.xCoord ? 1 : -1;
        }
        return position1.zCoord > position2.zCoord ? 1 : -1;
    }

    private minimizationFunction2(position1: IPosition, position2: IPosition, orderWidth: number, orderLength: number) {
        const position1Rest = position1.width % orderWidth;
        const position2Rest = position2.width % orderWidth;
        if (position1Rest === position2Rest) {
            return position1.fCoord > position2.fCoord;
        }
        return position1Rest > position2Rest ? 1 : -1;
    }

    private putOrderIntoPosition(order: IOrder, orderGroup: number, position: IPosition, start: number, positionBacklog: IPosition[]) {
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

        let createdPositions: IPosition[] = [];

        if (diff.y > 0 && order.stackingAllowed) {
            index++;
            const addPosition = {
                ...position,
                fCoord: position.zCoord + order.length,
                yCoord: position.yCoord + order.height,
                height: diff.y,
                length: order.length,
                index: index,
                groupRestrictedBy: orderGroup,
                stackedOnPosition: position.id,
                width: order.width,
                rCoord: position.xCoord + order.width
            } as IPosition;
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

        const goodPosition: IPosition = {
            ...position,
            fCoord: position.fCoord === Infinity || diff.z === Infinity? Infinity: position.fCoord - diff.z,
            rCoord: position.rCoord - diff.x,
            tCoord: position.tCoord - diff.y,
            height: order.height,
            width: order.width,
            length: order.length
        }

        return { createdPositions, messages, goodPosition };
    }

    private positionIsBehindOrInfrontFirstPosition(firstPosition: IPosition, position: IPosition): boolean {
        if ((firstPosition.tCoord <= position.yCoord) || (firstPosition.yCoord >= position.tCoord)) return false;
        if ((firstPosition.rCoord <= position.xCoord) || (firstPosition.xCoord >= position.rCoord)) return false;
        return true;
    }

    private mergeIfPossible(source: IPosition, candidate: IPosition): false | IPosition {
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