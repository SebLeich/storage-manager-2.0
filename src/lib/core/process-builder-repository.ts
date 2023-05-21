import { Observable, ReplaySubject } from "rxjs";
import { IInterface, IParamDefinition, IParam } from "@process-builder/interfaces";

export class ProcessBuilderRepository {

    public static createPseudoObjectFromIParam(arg: IParamDefinition | null | undefined, parent: any = null, config: {
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

            let defaultValue = arg.type === 'array' ? [] : arg.type === 'object' ? {} : arg.defaultValue;
            if (!defaultValue) defaultValue = config[arg.type]();
            if (!defaultValue) defaultValue = this._randomValueGenerator[arg.type]();

            if (Array.isArray(parent)) parent.push(defaultValue);
            else if (parent && typeof parent === 'object') parent[arg.name] = defaultValue;

            if (arg.typeDef) {
                let typeDefArray = Array.isArray(arg.typeDef) ? arg.typeDef : [arg.typeDef];

                for (let def of typeDefArray) {

                    this.createPseudoObjectFromIParamDefinition(def, defaultValue);

                }
            }

            index++;

            return defaultValue;

        } catch (e) {
            debugger;
            return {};
        }

    }

    public static createPseudoObjectFromIParamDefinition(arg: IParam | IParamDefinition | null | undefined, parent: any = null, config: {
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
        let defaultValue = arg.type === 'array' ? [] : arg.type === 'object' ? {} : arg.defaultValue;

        try {

            if (!defaultValue) {
                defaultValue = config[arg.type]();
            }
            if (!defaultValue) {
                defaultValue = this._randomValueGenerator[arg.type]();
            }

            if (Array.isArray(parent)) parent.push(defaultValue);
            else if (parent && typeof parent === 'object') parent[arg.name] = defaultValue;

            if (arg.typeDef) {
                let typeDefArray = Array.isArray(arg.typeDef) ? arg.typeDef : [arg.typeDef];

                for (let def of typeDefArray) {

                    this.createPseudoObjectFromIParamDefinition(def, defaultValue);

                }
            }

            index++;

        } catch (e) {
            debugger;
        } finally {
            return parent ?? defaultValue;
        }

    }

    public static createPseudoObjectFromIInterface(arg: IInterface | undefined, parent: any = null, config: {
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

        let dummyObject = {};

        try {

            let defaultValue = {};

            if (Array.isArray(parent)) {
                parent.push(defaultValue);
            }
            else if (parent && typeof parent === 'object') {
                parent[arg.name] = defaultValue;
            }

            if (arg.typeDef) {
                let typeDefArray = Array.isArray(arg.typeDef) ? arg.typeDef : [arg.typeDef];

                for (let def of typeDefArray) {

                    this.createPseudoObjectFromIParamDefinition(def, dummyObject);

                }
            }
        } catch (e) {
            debugger;
        } finally {
            return dummyObject;
        }

    }

    public static extractObjectTypeDefinition(arg: object | string | number | null | undefined, isRoot = true, defaultParamName = 'unnamed param', isNullable = false, isOptional = false, isConstant = false): IParamDefinition | IParamDefinition[] {

        const rootDef: IParamDefinition = {
            'name': defaultParamName,
            'normalizedName': this.normalizeName(defaultParamName),
            'nullable': isNullable,
            'optional': isOptional,
            'constant': isConstant,
            'defaultValue': !isConstant && typeof arg === 'object' ? null : arg,
            'type': Array.isArray(arg) ? 'array' : typeof arg,
            'interface': null,
            'typeDef': []
        };

        if (typeof arg !== 'object') {
            return rootDef;
        }

        if (rootDef.type === 'array') {
            const typeDef = this.extractObjectTypeDefinition((arg as object[])[0], false);
            return {
                ...rootDef,
                typeDef: [{
                    typeDef: typeDef
                } as IParamDefinition]
            }
        }

        let typeDef: IParamDefinition[] | IParamDefinition = [];
        if (typeof arg === 'object') {

            try {

                for (const entry of Object.entries(arg as object)) {

                    const def = this._getDefinitionForMember(entry);
                    if (def.type === 'object') {
                        if (entry[1]) {
                            def.typeDef = this.extractObjectTypeDefinition(entry[1], false);
                        }
                    } else if (def.type === 'array') {
                        let pseudoObject: any = {};
                        def.defaultValue = def.defaultValue.slice(0, 10);
                        (entry[1] as object[]).forEach(obj => {

                            for (let subEntry of Object.entries(obj)) {
                                if (pseudoObject[subEntry[0]]) continue;

                                pseudoObject[subEntry[0]] = subEntry[1];
                            }

                        });
                        def.typeDef = this.extractObjectTypeDefinition(pseudoObject);
                    }

                    typeDef.push(def);
                }

            } catch (e) {
                debugger;
            }

        } else {
            typeDef = this._getDefinitionForMember(['0', arg]);
        }

        if (isRoot) {
            rootDef.typeDef = typeDef;
            return rootDef;
        }

        return typeDef;

    }

    public static normalizeName(text?: string | null): string {
        if (typeof text !== 'string') {
            return '';
        }
        text = text.toLowerCase().replace(/[\(\)-_?:*%!;¿\s.]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
        return text.substr(0, 1).toLowerCase() + text.substr(1);
    }

    public static executeUserMethodAndReturnResponse(doc: string[], injector: any): Observable<any> {

        let subject = new ReplaySubject<any>(1);
        let jsText = doc.join('\n');

        let mainMethod: (injector: any) => any | Promise<any> = eval(jsText);
        if (this._returnsPromise(mainMethod)) (mainMethod(injector) as Promise<any>)
            .then((result: any) => subject.next(result))
            .catch((error: any) => subject.error(error))
            .finally(() => subject.complete());
        else {
            try {
                subject.next(mainMethod(injector));
            } catch (e) {
                subject.error(e);
            } finally {
                subject.complete();
            }
        }

        return subject.asObservable();
    }

    public static async calculateCustomImplementationOutput(arg: string[] | string | null | undefined | (() => string[] | string | null | undefined), injector: object) {
        let customImplementation = typeof arg === 'function' ? arg() : arg;
        if (Array.isArray(customImplementation)) {
            customImplementation = customImplementation.join('\n');
        }
        if (!customImplementation) {
            return;
        }

        return eval.call(
            window,
            `(${customImplementation})`
        )(injector);
    }

    private static _getDefinitionForMember(entry: [key: string, value: any]): IParamDefinition {
        let type = typeof entry[1];
        return {
            defaultValue: entry[1],
            name: entry[0],
            interface: null,
            constant: null,
            nullable: null,
            optional: null,
            type: type === 'object' && Array.isArray(entry[1]) ? 'array' : type,
            typeDef: null,
            normalizedName: ProcessBuilderRepository.normalizeName(entry[0])!
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
