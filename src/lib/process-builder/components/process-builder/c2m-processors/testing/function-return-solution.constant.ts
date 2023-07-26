import { ProcessBuilderRepository } from "@/lib/core/process-builder-repository";
import { IFunction } from "@/lib/process-builder/interfaces";

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
    requireStaticOutputDefinition: false
} as IFunction;

export default MOCK_FUNCTION_ReturnSolution;