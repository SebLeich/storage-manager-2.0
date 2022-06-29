import { IParam } from "src/lib/process-builder/globals/i-param";
import { InterfaceCodes } from "./interface-codes";
import { ParamCodes } from "./param-codes";

export default [
    {
        'identifier': ParamCodes.ExemplarySolution,
        'name': 'exemplary solution',
        'normalizedName': 'exemplarySolution',
        'constant': true,
        'interface': InterfaceCodes.Solution,
        'type': 'object'
    } as IParam,
];