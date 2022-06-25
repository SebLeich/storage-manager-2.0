import { Observable, ReplaySubject } from "rxjs";
import { getTooltipModule } from "../bpmn-io/bpmn-modules";
import { IBpmnJS } from "../process-builder/globals/i-bpmn-js";
import { IParamDefinition } from "../process-builder/globals/i-param-definition";

export class ProcessBuilderRepository {

    static createPseudoObjectFromIParamDefinition(arg: IParamDefinition | null | undefined, parent: any = {}, config: {
        string: () => string | undefined,
        boolean: () => boolean | undefined,
        number: () => number | undefined,
        object: () => object,
        array: () => any[],
        bigint: () => bigint | undefined,
        function: () => Function | undefined,
        symbol: () => symbol | undefined,
        undefined: () => undefined
    } = {
            string: () => undefined,
            boolean: () => undefined,
            number: () => undefined,
            object: () => { return {} },
            array: () => [],
            function: () => undefined,
            symbol: () => undefined,
            bigint: () => undefined,
            undefined: () => undefined
        }): object {

        if (!arg) return {};

        let index = 0;

        try {

            let defaultValue = arg.type === 'array' ? [] : arg.type === 'object' ? { ...arg.defaultValue } : arg.defaultValue;
            if (!defaultValue) defaultValue = config[arg.type]();
            if (!defaultValue) defaultValue = this._randomValueGenerator[arg.type]();

            Array.isArray(parent) ? parent.push(defaultValue) : parent[arg.name] = defaultValue;
            if (arg.typeDef) {
                let typeDefArray = Array.isArray(arg.typeDef) ? arg.typeDef : [arg.typeDef];

                for (let def of typeDefArray) {

                    this.createPseudoObjectFromIParamDefinition(def, arg);

                }
            }

            index++;

        } catch (e) {
            debugger;
        }

        return parent;

    }

    static clearAllTooltips(bpmnJS: IBpmnJS) {
        var tooltipModule = getTooltipModule(bpmnJS);
        Object.values(tooltipModule._tooltips).forEach(x => tooltipModule.remove(x));
    }

    static extractObjectIParams(arg: object | string | number | null | undefined, defaultParamName: string = 'unnamed param', isNullable: boolean = false, isOptional: boolean = false, isConstant: boolean = false): IParamDefinition {

        let output: IParamDefinition = {
            'name': defaultParamName,
            'normalizedName': this.normalizeName(defaultParamName),
            'nullable': isNullable,
            'optional': isOptional,
            'constant': isConstant,
            'defaultValue': arg,
            'type': null,
            'interface': null,
            'typeDef': []
        };
        if (typeof arg !== 'object') return output;

        if (typeof arg === 'object') {

            try {

                for (let entry of Object.entries(arg)) {

                    let def = this._getDefinitionForMember(entry);
                    if (def.type === 'object') {
                        if (entry[1]) def.typeDef = this.extractObjectIParams(entry[1]);
                    } else if (def.type === 'array') {
                        let pseudoObject: any = {};
                        def.defaultValue = def.defaultValue.slice(0, 10);
                        (entry[1] as object[]).forEach(obj => {

                            for (let subEntry of Object.entries(obj)) {
                                if (pseudoObject[subEntry[0]]) continue;

                                pseudoObject[subEntry[0]] = subEntry[1];
                            }

                        });
                        def.typeDef = this.extractObjectIParams([pseudoObject]);

                        (output.typeDef as IParamDefinition[]).push(def);
                        break;
                    }

                    (output.typeDef as IParamDefinition[]).push(def);
                }

            } catch (e) {
                debugger;
            }

        } else {
            output.typeDef = this._getDefinitionForMember(['0', arg]);
        }

        return output;

    }

    static normalizeName(text: string = 'unnamedFunction'): string {
        text = text.toLowerCase().replace(/[\(\)-_?:*%!;¿\s.]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
        return text.substr(0, 1).toLowerCase() + text.substr(1);
    }

    static testMethodAndGetResponse(doc: string[], injector: any): Observable<any> {

        let subject = new ReplaySubject<any>(1);
        let jsText = doc.join('\n');

        let main: (injector: any) => any | Promise<any> = eval(jsText);
        if (this._returnsPromise(main)) (main(injector) as Promise<any>)
            .then((result: any) => subject.next(result))
            .catch((error: any) => subject.error(error))
            .finally(() => subject.complete());
        else {
            try {
                subject.next(main(injector));
            } catch (e) {
                subject.error(e);
            } finally {
                subject.complete();
            }
        }

        return subject.asObservable();
    }

    private static _getDefinitionForMember(entry: [key: string, value: any]): IParamDefinition {
        let type = typeof entry[1];
        return {
            'defaultValue': entry[1],
            'name': entry[0],
            'type': type === 'object' && Array.isArray(entry[1]) ? 'array' : type,
            'typeDef': undefined,
            'normalizedName': ProcessBuilderRepository.normalizeName(entry[0])
        };
    }

    private static _randomValueGenerator = {
        'array': () => { return [] },
        'object': () => { return {} },
        'string': () => btoa(Math.random().toString()).slice(0, 5),
        'number': () => Math.floor(Math.random() * 11),
        'boolean': () => Math.floor(Math.random() * 11) % 2 === 1,
        'bigint': () => BigInt(Math.floor(Math.random() * 11)),
        'symbol': () => Symbol('foo'),
        'undefined': () => undefined,
        'function': () => () => { }
    };

    private static _isPromise = (p: any) => typeof p === 'object' && typeof p.then === 'function';
    private static _returnsPromise = (f: any) => f.constructor.name === 'AsyncFunction' || (typeof f === 'function' && this._isPromise(f()));

}
