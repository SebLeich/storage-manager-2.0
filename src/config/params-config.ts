import { IParam } from "src/lib/process-builder/interfaces/param.interface";
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
    {
        'identifier': ParamCodes.ExemplarySolutionWrapper2,
        'name': 'exemplary solution 2',
        'normalizedName': 'exemplarySolution2',
        'constant': true,
        'interface': InterfaceCodes.SolutionWrapper,
        'type': 'object'
    } as IParam,
];