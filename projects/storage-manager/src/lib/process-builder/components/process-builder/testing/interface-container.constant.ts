import { IInterface } from "@/lib/process-builder/interfaces";

const MOCK_INTERFACE_Container = {
    identifier: 'container',
    name: 'container template',
    normalizedName: 'container',
    typeDef: [
        { name: 'height', type: 'number', defaultValue: 1700, typeDef: null },
        { name: 'width', type: 'number', defaultValue: 2100, typeDef: null },
        { name: 'length', type: 'number', defaultValue: 3000, typeDef: null },
    ]
} as IInterface;
export default MOCK_INTERFACE_Container;