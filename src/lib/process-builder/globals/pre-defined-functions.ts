import { IFunction } from "./i-function";

export class PredefinedFunctions {

    customJSMethod(identifier: number, name: string = 'custom JS function'): IFunction {
        return {
            'identifier': identifier,
            'canFail': true,
            'description': 'a self-written, custom javascript code snippet',
            'inputParams': null,
            'name': name,
            'useDynamicInputParams': true,
            'pseudoImplementation': (...args: any) => args,
            'payload': undefined,
            'output': { 'param': 'dynamic' },
            'requireCustomImplementation': true
        } as IFunction;
    }

    objectToObjectMappingMethod(identifier: number, name: string = 'object mapping'): IFunction {
        return {
            'identifier': identifier,
            'canFail': true,
            'description': 'a method for object-to-object mapping',
            'inputParams': null,
            'name': name,
            'useDynamicInputParams': { typeLimits: ['object'] },
            'pseudoImplementation': (...args: any) => args,
            'payload': undefined,
            'output': { 'param': 'dynamic' }
        } as IFunction;
    }

}
