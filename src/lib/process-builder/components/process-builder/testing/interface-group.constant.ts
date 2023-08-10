import { IInterface } from "@/lib/process-builder/interfaces";

const MOCK_INTERFACE_Group = {
    identifier: 'group',
    name: 'group template',
    normalizedName: 'group',
    typeDef: [
        { name: 'id', type: 'number', defaultValue: 1 },
        { name: 'color', type: 'string', defaultValue: '#b71a1a' },
        { name: 'desc', type: 'string', defaultValue: 'Test AG' },
    ]
} as IInterface
export default MOCK_INTERFACE_Group;