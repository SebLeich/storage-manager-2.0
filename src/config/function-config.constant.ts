import { PredefinedFunctionTemplates } from "src/lib/process-builder/globals/pre-defined-functions";
import { InterfaceCodes } from "./interface-codes";
import { IFunctionTemplate } from "src/lib/process-builder/interfaces/function-template.interface";

export default [
    new PredefinedFunctionTemplates().customJSMethod(0),
    {
        identifier: 1,
        inputTemplates: null,
        name: 'Provide exemplary solution',
        normalizedName: 'provideExemplarySolution',
        description: 'method provides an exemplary solution',
        outputTemplate: InterfaceCodes.SolutionWrapper,
        implementation: `async () => {
            var result = await firstValueFrom(httpClient.get('/assets/exemplary-solution.json'));
            return result;
        }`,
        canFail: false
    } as IFunctionTemplate,
    new PredefinedFunctionTemplates().downloadAsJson(2),
    new PredefinedFunctionTemplates().provideStaticData(3),
    new PredefinedFunctionTemplates().delayMethod(6),
    new PredefinedFunctionTemplates().simulateFailMethod(7),
    {
        identifier: 8,
        inputTemplates: null,
        name: 'Provide another exemplary solution',
        normalizedName: 'provideAnotherExemplarySolution',
        description: 'method provides another exemplary solution',
        outputTemplate: InterfaceCodes.SolutionWrapper,
        implementation: `async () => {
            const { firstValueFrom } = await import('rxjs');
            var result = await firstValueFrom(httpClient.get('/assets/exemplary-solution2.json'));
            return result;
        }`,
        canFail: false
    } as IFunctionTemplate,
    {
        identifier: 9,
        canFail: false,
        description: 'the method calculates a solution based on the all in one row algorithm',
        inputTemplates: [
            { type: 'number', optional: false, name: 'containerHeight' },
            { type: 'number', optional: false, name: 'containerWidth' },
            { type: 'array', interface: InterfaceCodes.Group, optional: false, name: 'groups' },
            { type: 'array', interface: InterfaceCodes.Order, optional: false, name: 'orders' },
        ],
        name: 'all in one row',
        implementation: `async () => {
            const algorithm = new AllInOneRowSolver();
            return algorithm.solve(containerHeight, containerWidth, groups, orders);
        }`,
        outputTemplate: InterfaceCodes.Solution,
        requireCustomImplementation: false
    } as IFunctionTemplate,
    {
        identifier: 10,
        canFail: false,
        description: 'the method calculates a solution based on the start left bottom algorithm',
        inputTemplates: [
            { type: 'number', optional: false, name: 'containerHeight' },
            { type: 'number', optional: false, name: 'containerWidth' },
            { type: 'array', interface: InterfaceCodes.Group, optional: false, name: 'groups' },
            { type: 'array', interface: InterfaceCodes.Order, optional: false, name: 'orders' },
        ],
        name: 'start left bottom',
        implementation: `async () => {
            const algorithm = new StartLeftBottomSolver();
            return algorithm.solve(containerHeight, containerWidth, groups, orders);
        }`,
        outputTemplate: InterfaceCodes.Solution,
        requireCustomImplementation: false
    } as IFunctionTemplate,
    {
        identifier: 11,
        canFail: false,
        description: 'the method calculates a solution based on the super flo algorithm',
        inputTemplates: [
            { type: 'number', optional: false, name: 'containerHeight' },
            { type: 'number', optional: false, name: 'containerWidth' },
            { type: 'array', interface: InterfaceCodes.Group, optional: false, name: 'groups' },
            { type: 'array', interface: InterfaceCodes.Order, optional: false, name: 'orders' },
        ],
        name: 'super flo',
        implementation: `async () => {
            const algorithm = new SuperFloSolver();
            return algorithm.solve(containerHeight, containerWidth, groups, orders);
        }`,
        outputTemplate: InterfaceCodes.Solution,
        requireCustomImplementation: false
    } as IFunctionTemplate
];
