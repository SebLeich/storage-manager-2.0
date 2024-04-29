import ACTIVITY_FACTORY from "../testing/activity-factory.constant";
import DATA_OBJECT_FACTORY from "../testing/data-object-factory.constant";
import { BPMNJsRepository } from "./bpmn-js.repository";

describe('BpmnJsRepository', () => {

    const MOCK_FUNCTION_ID = 1234,
        MOCK_DATA_OBJECT_ID = 4321,
        activity = ACTIVITY_FACTORY(MOCK_FUNCTION_ID),
        dataObjectReference = DATA_OBJECT_FACTORY(MOCK_DATA_OBJECT_ID);

    it('should return activity function identifier', () => {
        const activityFunctionId = BPMNJsRepository.getActivityFunctionId(activity);

        expect(activityFunctionId).toBe(MOCK_FUNCTION_ID);
    });

    it('should return data parameter identifier', () => {
        const dataParamId = BPMNJsRepository.getDataParamId(dataObjectReference);

        expect(dataParamId).toBe(MOCK_DATA_OBJECT_ID);
    });

});