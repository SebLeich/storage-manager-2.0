import * as fromIFunction from 'src/lib/process-builder/store/reducers/function.reducer';
import * as fromInjectionContext from 'src/lib/process-builder/store/reducers/injection-context.reducer';
import * as fromIParam from 'src/lib/process-builder/store/reducers/param.reducer';
import MOCK_FUNCTION_Return1 from './function-return-1.constant';
import INJECTOR from './injector.constant';
import INJECTOR_INTERFACE from './injector-interface.constant';

const INITIAL_STATE = {
    [fromIFunction.featureKey]: {
        entities: {
            [MOCK_FUNCTION_Return1.identifier]: MOCK_FUNCTION_Return1
        },
        ids: [MOCK_FUNCTION_Return1.identifier]
    } as fromIFunction.State,
    [fromInjectionContext.featureKey]: {
        values: INJECTOR,
        interfaces: INJECTOR_INTERFACE
    } as fromInjectionContext.State,
    [fromIParam.featureKey]: {
        entities: {},
        ids: []
    } as fromIParam.State
};
export default INITIAL_STATE;