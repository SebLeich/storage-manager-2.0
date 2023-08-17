import { ParamType } from "../types/param.type";

export interface IParamDefinition {
    type: ParamType;
    name: string;
    normalizedName: string;
    typeDef: null | IParamDefinition | IParamDefinition[];
    interface: string | null;
    defaultValue: any | null;
    constant: boolean | null;
    nullable: boolean | null;
    optional: boolean | null;
}
