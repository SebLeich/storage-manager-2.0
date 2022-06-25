export interface IParamDefinition {
    type: 'number' | 'string' | 'boolean' | 'object' | 'array' | 'symbol' | 'undefined' | 'function' | 'bigint';
    name: string;
    normalizedName: string;
    typeDef?: undefined | null | IParamDefinition | IParamDefinition[];
    interface?: number;
    defaultValue?: any;
    constant?: boolean;
    nullable?: boolean;
    optional?: boolean;
}
