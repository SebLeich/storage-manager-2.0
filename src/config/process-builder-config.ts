import { IProcessBuilderConfig } from "src/lib/process-builder/interfaces/process-builder-config.interface";
import { InterfaceCodes } from "./interface-codes";

export default {
    statusConfig: {
        initialStatus: 'initial',
        finalStatus: 'final'
    },
    errorGatewayConfig: {
        errorConnectionName: 'on error',
        gatewayName: 'task failed?',
        successConnectionName: 'on success'
    },
    dynamicParamDefaultNaming: 'unnamed param',
    defaultFunctionName: 'unnamed function',
    expectInterface: InterfaceCodes.SolutionWrapper
} as IProcessBuilderConfig;