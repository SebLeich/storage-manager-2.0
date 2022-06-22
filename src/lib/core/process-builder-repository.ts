import { Observable, ReplaySubject } from "rxjs";
import { getTooltipModule } from "../bpmn-io/bpmn-modules";
import { IBpmnJS } from "../process-builder/globals/i-bpmn-js";
import { IParamKeyValue } from "../process-builder/globals/i-param-key-value";

export class ProcessBuilderRepository {

    static convertIParamKeyValuesToPseudoObject(values: IParamKeyValue[] | undefined, parent: any = {}, config: {
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

        if (!Array.isArray(values)) return {};

        let index = 0;

        for (let value of values) {

            try {

                let defaultValue = value.type === 'array' ? [] : value.type === 'object' ? { ...value.defaultValue } : value.defaultValue;
                if (!defaultValue) defaultValue = config[value.type]();
                if (!defaultValue) defaultValue = this._randomValueGenerator[value.type]();

                Array.isArray(parent) ? parent.push(defaultValue) : parent[value.name] = defaultValue;
                if (Array.isArray(value.typeDef)) {
                    if (Array.isArray(parent[value.name])) {
                        this.convertIParamKeyValuesToPseudoObject(value.typeDef, parent[index], config);
                    } else {
                        if (Object.isFrozen(parent[value.name])) debugger;
                        this.convertIParamKeyValuesToPseudoObject(value.typeDef, parent[value.name], config);
                    }
                }

                index++;

            } catch (e) {
                debugger;
            }

        }

        return parent;

    }

    static clearAllTooltips(bpmnJS: IBpmnJS) {
        var tooltipModule = getTooltipModule(bpmnJS);
        Object.values(tooltipModule._tooltips).forEach(x => tooltipModule.remove(x));
    }

    static extractObjectIParams(object: any): IParamKeyValue[] {

        let output: IParamKeyValue[] = [];
        if (!object) return output;

        if (typeof object === 'object') {

            try {

                for (let entry of Object.entries(object)) {

                    // @ts-ignore
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
                        output.push(def);
                        break;
                    }
                    output.push(def);
                }

            } catch (e) {
                debugger;
            }

        } else output.push(this._getDefinitionForMember(['0', object]));

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

    private static _getDefinitionForMember(entry: [key: string, value: any]): IParamKeyValue {
        let type = typeof entry[1];
        return {
            'defaultValue': entry[1],
            'name': entry[0],
            'type': type === 'object' ? Array.isArray(entry[1]) ? 'array' : type : type,
            'typeDef': undefined
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
