import { ProcessBuilderRepository } from "@/lib/core/process-builder-repository";

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
    requireStaticOutputDefinition: false,
    _isImplementation: true
} as any;

export default MOCK_FUNCTION_Return1;