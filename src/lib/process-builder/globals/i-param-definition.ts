export interface IParamDefinition {
    type: 'number' | 'string' | 'boolean' | 'object' | 'array' | 'symbol' | 'undefined' | 'function' | 'bigint';
    name: string;
    normalizedName: string;
    typeDef?: null | IParamDefinition | IParamDefinition[];
    interface: number | null;
    defaultValue: any | null;
    constant: boolean | null;
    nullable: boolean | null;
    optional: boolean | null;
}
