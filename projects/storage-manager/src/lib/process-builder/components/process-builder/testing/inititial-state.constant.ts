import * as fromIFunction from 'src/lib/process-builder/store/reducers/function.reducer';
import * as fromInjectionContext from 'src/lib/process-builder/store/reducers/injection-context.reducer';
import * as fromIParam from 'src/lib/process-builder/store/reducers/param.reducer';
import * as fromIInterface from 'src/lib/process-builder/store/reducers/interface.reducer';
import MOCK_FUNCTION_Return1 from './function-return-1.constant';
import INJECTOR from './injector.constant';
import INJECTOR_INTERFACE from './injector-interface.constant';
import MOCK_FUNCTION_ReturnSolution from './function-return-solution.constant';
import MOCK_PARAM_Solution from './param-solution.constant';
import MOCK_INTERFACE_Solution from './interface-solution.constant';
import MOCK_INTERFACE_Container from './interface-container.constant';
import MOCK_INTERFACE_Group from './interface-group.constant';

const INITIAL_STATE = {
    [fromIFunction.featureKey]: {
        entities: {
            [MOCK_FUNCTION_Return1.identifier]: MOCK_FUNCTION_Return1,
            [MOCK_FUNCTION_ReturnSolution.identifier]: MOCK_FUNCTION_ReturnSolution
        },
        ids: [MOCK_FUNCTION_Return1.identifier, MOCK_FUNCTION_ReturnSolution.identifier]
    } as fromIFunction.State,
    [fromInjectionContext.featureKey]: {
        values: INJECTOR,
        interfaces: INJECTOR_INTERFACE
    } as fromInjectionContext.State,
    [fromIParam.featureKey]: {
        entities: {
            [MOCK_PARAM_Solution.identifier]: MOCK_PARAM_Solution
        },
        ids: [MOCK_PARAM_Solution.identifier]
    } as fromIParam.State,
    [fromIInterface.featureKey]: {
        entities: {
            [MOCK_INTERFACE_Container.identifier]: MOCK_INTERFACE_Container,
            [MOCK_INTERFACE_Group.identifier]: MOCK_INTERFACE_Group,
            [MOCK_INTERFACE_Solution.identifier]: MOCK_INTERFACE_Solution
        },
        ids: [MOCK_INTERFACE_Container.identifier, MOCK_INTERFACE_Group.identifier, MOCK_INTERFACE_Solution.identifier]
    } as fromIInterface.State
};
export default INITIAL_STATE;