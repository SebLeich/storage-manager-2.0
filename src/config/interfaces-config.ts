import { IInterface } from "src/lib/process-builder/globals/i-interface";
import { InterfaceCodes } from "./interface-codes";

export default [
    {
        identifier: InterfaceCodes.Solution,
        typeDef: [
            { 'name': 'id', 'type': 'string', 'defaultValue': 'ab34762f-ccd1-4258-b3e1-69558728e6b4' },
            {
                'name': 'container',
                'type': 'object',
                'interface': InterfaceCodes.Container
            },
            { 'name': 'alogorithm', 'type': 'string', 'defaultValue': 'all in one row' },
            {
                'name': 'groups',
                'type': 'array',
                'defaultValue': null,
                'typeDef': [
                    {
                        'interface': InterfaceCodes.Group,
                        'type': 'object'
                    }
                ]
            },
            { 'name': 'description', 'type': 'string', 'defaultValue': 'exemplary algorithm' },
            { 'name': 'calculated', 'type': 'string', 'defaultValue': '2020-01-01T12:00:00' },
            {
                'name': 'steps',
                'type': 'array',
                'defaultValue': null,
                'typeDef': [
                    {
                        'interface': InterfaceCodes.Step,
                        'type': 'object'
                    }
                ]
            },
        ],
        name: 'solution template',
        normalizedName: 'solution'
    } as IInterface,
    {
        identifier: InterfaceCodes.Container,
        name: 'container template',
        normalizedName: 'container',
        typeDef: [
            { 'name': 'height', 'type': 'number', 'defaultValue': 1700 },
            { 'name': 'width', 'type': 'number', 'defaultValue': 2100 },
            { 'name': 'length', 'type': 'number', 'defaultValue': 3000 },
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
            { 'name': 'id', 'type': 'number', 'defaultValue': 1 },
            { 'name': 'desc', 'type': 'string', 'defaultValue': 'pallet' },
            { 'name': 'height', 'type': 'number', 'defaultValue': 10 },
            { 'name': 'group', 'type': 'number', 'defaultValue': 1 },
        ]
    } as IInterface,
    {
        identifier: InterfaceCodes.Group,
        name: 'group template',
        normalizedName: 'group',
        typeDef: [
            { 'name': 'id', 'type': 'number', 'defaultValue': 1 },
            { 'name': 'color', 'type': 'string', 'defaultValue': '#b71a1a' },
            { 'name': 'desc', 'type': 'string', 'defaultValue': 'Test AG' },
        ]
    } as IInterface,
    {
        identifier: InterfaceCodes.Step,
        name: 'step template',
        normalizedName: 'step',
        typeDef: [
            { 'name': 'sequenceNumber', 'type': 'number', 'defaultValue': 0 },
        ]
    } as IInterface
];