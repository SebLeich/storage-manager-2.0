import { ProcessBuilderRepository } from "@/lib/core/process-builder-repository";
import { IFunction } from "@/lib/process-builder/interfaces";

const mockName = 'Return1';
const MOCK_FUNCTION_Return1 = {
    identifier: 1,
    customImplementation: ['return 1;'],
    name: mockName,
    normalizedName: ProcessBuilderRepository.normalizeName(mockName),
    inputTemplates: [],
    output: null,
    canFail: false,
    inputs: [],
    requireCustomImplementation: false,
    outputTemplate: null,
    requireStaticOutputDefinition: false
} as IFunction;

export default MOCK_FUNCTION_Return1;