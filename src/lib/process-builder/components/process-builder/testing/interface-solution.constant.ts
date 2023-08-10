import { ProcessBuilderRepository } from "@/lib/core/process-builder-repository";
import { IInterface } from "@/lib/process-builder/interfaces";
import MOCK_INTERFACE_Group from "./interface-group.constant";
import MOCK_INTERFACE_Container from "./interface-container.constant";

const MOCK_NAME = 'solution';
const MOCK_INTERFACE_Solution = {
    identifier: 'solution',
    name: MOCK_NAME,
    normalizedName: ProcessBuilderRepository.normalizeName(MOCK_NAME),
    typeDef: [
        { name: 'id', type: 'string', defaultValue: 'ab34762f-ccd1-4258-b3e1-69558728e6b4', typeDef: null },
        { name: 'container', type: 'object', interface: MOCK_INTERFACE_Container.identifier, typeDef: null },
        { name: 'alogorithm', type: 'string', defaultValue: 'all in one row', typeDef: null },
        {
            name: 'groups',
            type: 'array',
            defaultValue: null,
            typeDef: [
                {
                    interface: MOCK_INTERFACE_Group.identifier,
                    type: 'object',
                    typeDef: null
                }
            ]
        },
        { name: 'description', type: 'string', defaultValue: 'exemplary algorithm', typeDef: null },
        { name: 'calculated', type: 'string', defaultValue: '2020-01-01T12:00:00', typeDef: null }
    ]
} as IInterface
export default MOCK_INTERFACE_Solution;