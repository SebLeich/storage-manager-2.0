import { delay } from "rxjs";
import { lastValueFrom } from "rxjs/internal/lastValueFrom";
import { timer } from "rxjs/internal/observable/timer";
import { withLatestFrom } from "rxjs/internal/operators/withLatestFrom";
import { IFunction } from "./i-function";

export class PredefinedFunctions {

    public customJSMethod(identifier: number, name: string = 'custom JS function'): IFunction {
        return {
            'identifier': identifier,
            'canFail': false,
            'description': 'a self-written, custom javascript code snippet',
            'inputParams': null,
            'name': name,
            'useDynamicInputParams': true,
            'implementation': (...args: any) => args,
            'payload': undefined,
            'output': { 'param': 'dynamic' },
            'requireCustomImplementation': true
        } as IFunction;
    }

    public delayMethod(identifier: number, name: string = 'delay'): IFunction {
        return {
            'identifier': identifier,
            'canFail': false,
            'description': 'the method delays the further pipe execution',
            'inputParams': null,
            'name': name,
            'useDynamicInputParams': false,
            'implementation': (timeOutMs = 1000) => {
                return lastValueFrom(timer(timeOutMs));
            },
            'payload': undefined,
            'output': null,
            'requireCustomImplementation': false
        } as IFunction;
    }

    public failMethod(identifier: number, name: string = 'fail'): IFunction {
        return {
            'identifier': identifier,
            'canFail': true,
            'description': 'the method throws an error',
            'inputParams': null,
            'name': name,
            'useDynamicInputParams': false,
            'implementation': () => {
                throw 'mock error';
            },
            'payload': undefined,
            'output': null,
            'requireCustomImplementation': false
        } as IFunction;
    }

    public objectToObjectMappingMethod(identifier: number, name: string = 'object mapping'): IFunction {
        return {
            'identifier': identifier,
            'canFail': false,
            'description': 'a method for object-to-object mapping',
            'inputParams': null,
            'name': name,
            'useDynamicInputParams': { typeLimits: ['object'] },
            'implementation': (...args: any) => args,
            'payload': undefined,
            'output': { 'param': 'dynamic' }
        } as IFunction;
    }

}
