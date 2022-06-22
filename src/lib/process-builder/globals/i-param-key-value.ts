export interface IParamKeyValue {
    type: 'number' | 'string' | 'boolean' | 'object' | 'array' | 'symbol' | 'undefined' | 'function' | 'bigint';
    name: string;
    typeDef: null | undefined | IParamKeyValue[];
    defaultValue?: any;
}
