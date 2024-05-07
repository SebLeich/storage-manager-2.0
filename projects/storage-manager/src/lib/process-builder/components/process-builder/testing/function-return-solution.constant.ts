import { ProcessBuilderRepository } from "@/lib/core/process-builder-repository";

const mockName = 'ReturnSolution';
const MOCK_FUNCTION_ReturnSolution = {
    identifier: 2,
    customImplementation: ['return solution;'],
    name: mockName,
    normalizedName: ProcessBuilderRepository.normalizeName(mockName),
    inputTemplates: [],
    output: 1,
    canFail: false,
    inputs: [],
    requireCustomImplementation: false,
    outputTemplate: null,
    requireStaticOutputDefinition: false,
    _isImplementation: true
} as any;

export default MOCK_FUNCTION_ReturnSolution;