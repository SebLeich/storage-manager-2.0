import { IParam } from "src/lib/process-builder/globals/i-param";
import { InterfaceCodes } from "./interface-codes";
import { ParamCodes } from "./param-codes";

export default [
    {
        'identifier': ParamCodes.ExemplarySolutionWrapper,
        'name': 'exemplary solution',
        'normalizedName': 'exemplarySolution',
        'constant': true,
        'interface': InterfaceCodes.SolutionWrapper,
        'type': 'object'
    } as IParam,
];