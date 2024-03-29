import { IInterface } from "@process-builder/interfaces";
import { InterfaceCodes } from "./interface-codes";

export default [
    {
        identifier: InterfaceCodes.Solution,
        name: 'solution template',
        normalizedName: 'solution',
        typeDef: [
            { name: 'id', type: 'string', defaultValue: 'ab34762f-ccd1-4258-b3e1-69558728e6b4', typeDef: null },
            { name: 'container', type: 'object', interface: InterfaceCodes.Container, typeDef: null },
            { name: 'alogorithm', type: 'string', defaultValue: 'all in one row', typeDef: null },
            {
                name: 'groups',
                type: 'array',
                defaultValue: null,
                typeDef: [
                    {
                        interface: InterfaceCodes.Group,
                        type: 'object',
                        typeDef: null
                    }
                ]
            },
            { name: 'description', type: 'string', defaultValue: 'exemplary algorithm', typeDef: null },
            { name: 'calculated', type: 'string', defaultValue: '2020-01-01T12:00:00', typeDef: null },
            {
                name: 'steps',
                type: 'array',
                defaultValue: null,
                typeDef: [
                    {
                        interface: InterfaceCodes.Step,
                        type: 'object',
                        typeDef: null
                    }
                ]
            },
        ]
    } as IInterface,
    {
        identifier: InterfaceCodes.SolutionWrapper,
        name: 'solution wrapper',
        normalizedName: 'solutionWrapper',
        typeDef: [
            { name: 'solution', type: 'object', interface: InterfaceCodes.Solution, typeDef: null },
            {
                name: 'groups',
                type: 'array',
                defaultValue: null,
                typeDef: [
                    {
                        interface: InterfaceCodes.Group,
                        type: 'object',
                        typeDef: null
                    }
                ]
            },
        ]
    } as IInterface,
    {
        identifier: InterfaceCodes.Container,
        name: 'container template',
        normalizedName: 'container',
        typeDef: [
            { name: 'height', type: 'number', defaultValue: 1700, typeDef: null },
            { name: 'width', type: 'number', defaultValue: 2100, typeDef: null },
            { name: 'length', type: 'number', defaultValue: 3000, typeDef: null },
            {
                name: 'goods', type: 'array', typeDef: [
                    {
                        name: null,
                        type: 'object',
                        interface: InterfaceCodes.Good
                    }
                ]
            }
        ]
    } as IInterface,
    {
        identifier: InterfaceCodes.Good,
        name: 'good template',
        normalizedName: 'good',
        typeDef: [
            { name: 'id', 'type': 'number', 'defaultValue': 1 },
            { name: 'desc', 'type': 'string', 'defaultValue': 'pallet' },
            { name: 'height', 'type': 'number', 'defaultValue': 10 },
            { name: 'group', 'type': 'number', 'defaultValue': 1 },
        ]
    } as IInterface,
    {
        identifier: InterfaceCodes.Group,
        name: 'group template',
        normalizedName: 'group',
        typeDef: [
            { name: 'id', type: 'number', defaultValue: 1 },
            { name: 'color', type: 'string', defaultValue: '#b71a1a' },
            { name: 'desc', type: 'string', defaultValue: 'Test AG' },
        ]
    } as IInterface,
    {
        identifier: InterfaceCodes.Step,
        name: 'step template',
        normalizedName: 'step',
        typeDef: [
            { name: 'sequenceNumber', type: 'number', defaultValue: 0 },
            { name: 'messages', type: 'array', defaultValue: ['hello world'], typeDef: [] },
            { name: 'usedPosition', type: 'object', interface: InterfaceCodes.Position },
            { name: 'placedAtPosition', type: 'object', interface: InterfaceCodes.Position },
            {
                name: 'createdPositions', type: 'array', typeDef: [
                    {
                        name: null,
                        type: 'object',
                        interface: InterfaceCodes.Position
                    }
                ]
            } as any
        ]
    } as IInterface,
    {
        identifier: InterfaceCodes.Position,
        name: 'position template',
        normalizedName: 'position',
        typeDef: [
            { name: 'id', type: 'string', defaultValue: '00000000-0000-0000-0000-000000000000' },
            { name: 'rotated', type: 'boolean', defaultValue: false },
            { name: 'index', type: 'number', defaultValue: 1 },
            { name: 'height', type: 'number', defaultValue: 100 },
            { name: 'width', type: 'number', defaultValue: 100 },
            { name: 'length', type: 'number', defaultValue: 100 },
            { name: 'xCoord', type: 'number', defaultValue: 0 },
            { name: 'yCoord', type: 'number', defaultValue: 0 },
            { name: 'zCoord', type: 'number', defaultValue: 0 },
        ]
    } as IInterface,
    {
        identifier: InterfaceCodes.Space,
        name: 'space template',
        normalizedName: 'space',
        typeDef: [
            { name: 'height', type: 'number', defaultValue: 100 },
            { name: 'width', type: 'number', defaultValue: 100 },
            { name: 'length', type: 'number', defaultValue: 100 },
        ]
    } as IInterface,
    {
        identifier: InterfaceCodes.PositionedElement,
        name: 'positioned element template',
        normalizedName: 'positionedElement',
        typeDef: [
            { name: 'xCoord', type: 'number', defaultValue: 0 },
            { name: 'yCoord', type: 'number', defaultValue: 0 },
            { name: 'zCoord', type: 'number', defaultValue: 0 },
        ]
    } as IInterface,
    {
        identifier: InterfaceCodes.Order,
        name: 'order template',
        normalizedName: 'order',
        typeDef: [
            { name: 'id', type: 'string', defaultValue: '00000000-0000-0000-0000-000000000000' },
            { name: 'index', type: 'number', defaultValue: 1 },
            { name: 'description', type: 'string', defaultValue: 'Exemplary order' },
            { name: 'quantity', type: 'number', defaultValue: 1 },
            { name: 'width', type: 'number', defaultValue: 100 },
            { name: 'length', type: 'number', defaultValue: 100 },
            { name: 'height', type: 'number', defaultValue: 100 },
            { name: 'turningAllowed', type: 'boolean', defaultValue: false },
            { name: 'stackingAllowed', type: 'boolean', defaultValue: false },
            { name: 'group', type: 'string', defaultValue: 'groupIdentifier' },
        ]
    } as IInterface
];