import { ProcessBuilderRepository } from "@/lib/core/process-builder-repository";
import { IFunction } from "@/lib/process-builder/interfaces";

const mockName = 'Void';
const MOCK_FUNCTION_Void = {
    identifier: 3,
    customImplementation: ["console.log('void');"],
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

export default MOCK_FUNCTION_Void;