import { IParamDefinition, IParam } from "@process-builder/interfaces";
import { ParamType } from "../process-builder/types/param.type";
import { camelCase } from "lodash";

export class ProcessBuilderRepository {

    /**
     * @deprecated
     * @param arg 
     * @param parent 
     * @param config 
     * @returns 
     */
    public static createPseudoObjectFromIParam(arg: IParamDefinition | null | undefined, parent: any = null, config: {
        string: () => string | undefined,
        boolean: () => boolean | undefined,
        number: () => number | undefined,
        object: () => object,
        array: () => any[],
        bigint: () => bigint | undefined,
        function: () => (() => unknown) | undefined,
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

        try {

            let defaultValue = arg.type === 'array' ? [] : arg.type === 'object' ? {} : arg.defaultValue;
            if (!defaultValue) defaultValue = config[arg.type]();
            if (!defaultValue) defaultValue = this._randomValueGenerator[arg.type]();

            if (Array.isArray(parent)) parent.push(defaultValue);
            else if (parent && typeof parent === 'object') parent[arg.name] = defaultValue;

            if (arg.typeDef) {
                const typeDefArray = Array.isArray(arg.typeDef) ? arg.typeDef : [arg.typeDef];

                for (const def of typeDefArray) {
                    this.createPseudoObjectFromIParamDefinition(def, defaultValue);
                }
            }

            return defaultValue;

        } catch (e) {
            console.error(e);
            return {};
        }

    }

    /**
     * @deprecated
     * @param arg 
     * @param parent 
     * @param config 
     * @returns 
     */
    public static createPseudoObjectFromIParamDefinition(arg: IParam | IParamDefinition | null | undefined, parent: any = null, config: {
        string: () => string | undefined,
        boolean: () => boolean | undefined,
        number: () => number | undefined,
        object: () => object,
        array: () => any[],
        bigint: () => bigint | undefined,
        function: () => (() => any) | undefined,
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
                const typeDefArray = Array.isArray(arg.typeDef) ? arg.typeDef : [arg.typeDef];
                for (const def of typeDefArray) {
                    this.createPseudoObjectFromIParamDefinition(def, defaultValue);
                }
            }

            index++;
            return parent ?? defaultValue;
        } catch (e) {
            console.error(e);
            return defaultValue;
        }

    }

    /**
     * @deprecated
     * @param arg 
     * @param parent 
     * @param config 
     * @returns 
     */
    public static extractObjectTypeDefinition(arg: any, isRoot = true, defaultParamName = 'unnamed param', isNullable = false, isOptional = false, isConstant = false, isCollection = false): IParamDefinition | IParamDefinition[] {

        const rootDef: IParamDefinition = {
            'name': defaultParamName,
            'normalizedName': this.normalizeName(defaultParamName),
            'nullable': isNullable,
            'optional': isOptional,
            'constant': isConstant,
            'defaultValue': !isConstant && typeof arg === 'object' ? null : arg,
            'type': Array.isArray(arg) ? 'array' : (typeof arg) as ParamType,
            'interface': null,
            'typeDef': [],
            isCollection
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
                        const pseudoObject: any = {};
                        def.defaultValue = def.defaultValue.slice(0, 10);
                        (entry[1] as object[]).forEach(obj => {

                            for (const subEntry of Object.entries(obj)) {
                                if (pseudoObject[subEntry[0]]) continue;

                                pseudoObject[subEntry[0]] = subEntry[1];
                            }

                        });
                        def.typeDef = this.extractObjectTypeDefinition(pseudoObject);
                    }

                    typeDef.push(def);
                }

            } catch (e) {
                console.error(e);
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
        return camelCase(text ?? '');
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
        const type = typeof entry[1] as ParamType;
        return {
            defaultValue: entry[1],
            name: entry[0],
            interface: null,
            constant: null,
            type: type === 'object' && Array.isArray(entry[1]) ? 'array' : type,
            typeDef: null,
            normalizedName: ProcessBuilderRepository.normalizeName(entry[0])!,
            isCollection: false,
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
        'function': () => () => { /** my method */ }
    };

}
