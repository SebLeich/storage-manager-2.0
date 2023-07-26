import { ProcessBuilderRepository } from "@/lib/core/process-builder-repository";
import { IParam } from "@/lib/process-builder/interfaces";

const mockName = 'solution';
const MOCK_PARAM_Solution = {
    _isIParam: true,
    identifier: 1,
    constant: true,
    defaultValue: null,
    interface: 'solution',
    isProcessOutput: true,
    name: mockName,
    normalizedName: ProcessBuilderRepository.normalizeName(mockName),
    nullable: true,
    optional: false,
    type: 'object',
    typeDef: []
} as IParam;

export default MOCK_PARAM_Solution;