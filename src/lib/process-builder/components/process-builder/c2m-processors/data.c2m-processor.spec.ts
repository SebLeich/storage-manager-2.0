import { Store } from "@ngrx/store";
import { TestBed } from "@angular/core/testing";
import defaultImportsConstant from "@/app/default-imports.constant";
import { ProcessBuilderModule } from "@/lib/process-builder/process-builder.module";
import { provideMockStore } from "@ngrx/store/testing";
import INITIAL_STATE from "./testing/inititial-state.constant";
import { ProcessBuilderComponentService } from "../process-builder-component.service";
import processBuilderConfig from "@/config/process-builder-config";
import { FUNCTIONS_CONFIG_TOKEN, IParam, PROCESS_BUILDER_CONFIG_TOKEN } from "@/lib/process-builder/interfaces";
import { DataC2MProcessor } from "./data.c2m-processor";
import { ITaskCreationPayload } from "@/lib/process-builder/interfaces/task-creation-payload.interface";
import { upsertIParam } from "@/lib/process-builder/store";
import { ITaskCreationFormGroupValue } from "@/lib/process-builder/interfaces/task-creation-form-group-value.interface";
import { IElement } from "@/lib/bpmn-io/interfaces/element.interface";
import MOCK_FUNCTION_ReturnA from "./testing/function-return-solution.constant";
import MOCK_PARAM_Solution from "./testing/param-solution.constant";
import { ProcessBuilderRepository } from "@/lib/core/process-builder-repository";
import { BPMNJsRepository } from "@/lib/core/bpmn-js.repository";
import { IConnector } from "@/lib/bpmn-io/interfaces/connector.interface";
import MOCK_FUNCTION_Void from "./testing/function-void.constant";
import shapeTypes from "@/lib/bpmn-io/shape-types";
import { IModelingModule } from "@/lib/bpmn-io/interfaces/modules";
import { BpmnJsService } from "@/lib/process-builder/services/bpmn-js.service";

describe('DataC2MProcessor', () => {
    let processor: DataC2MProcessor, 
        store: Store, 
        dispatchSpy: jasmine.Spy, 
        bpmnJsService: BpmnJsService,
        modelingModule: IModelingModule;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ...defaultImportsConstant,
                ProcessBuilderModule
            ],
            providers: [
                provideMockStore({ initialState: INITIAL_STATE }),
                ProcessBuilderComponentService,
                { provide: PROCESS_BUILDER_CONFIG_TOKEN, useValue: processBuilderConfig },
                { provide: FUNCTIONS_CONFIG_TOKEN, useValue: [] },
                DataC2MProcessor
            ]
        });
        processor = TestBed.inject(DataC2MProcessor);
        store = TestBed.inject(Store);
        dispatchSpy = spyOn(store, 'dispatch');
        bpmnJsService = TestBed.inject(BpmnJsService);
        modelingModule = bpmnJsService.modelingModule;
    });

    it('should create', () => {
        expect(processor).toBeTruthy();
    });

    it('should apply no changes when no activity is passed', async () => {
        const taskCreationFormGroupValue = { outputParamName: 'myParam' } as ITaskCreationFormGroupValue;
        await processor.processConfiguration(
            {
                taskCreationPayload: { configureActivity: undefined } as ITaskCreationPayload,
                taskCreationFormGroupValue: taskCreationFormGroupValue
            }
            , {});

        expect(dispatchSpy).not.toHaveBeenCalledWith(upsertIParam({} as IParam));
    });

    it('should apply changes correctly', async () => {
        const { activity, appendOutputParamSpy, taskCreationFormGroupValue, updatedParam } = createTestingData();

        await processor.processConfiguration(
            {
                taskCreationPayload: { configureActivity: activity } as ITaskCreationPayload,
                taskCreationFormGroupValue: taskCreationFormGroupValue
            },
            { updatedFunction: MOCK_FUNCTION_ReturnA }
        );

        expect(dispatchSpy).toHaveBeenCalledWith(upsertIParam(updatedParam));
        expect(appendOutputParamSpy).toHaveBeenCalledWith(jasmine.any(Object), activity, updatedParam, true, processBuilderConfig.expectInterface);
    });

    it('should delete all output data constructs when there is no output value', async () => {
        const { activity, appendOutputParamSpy, outputTargets, removeElementsSpy, taskCreationFormGroupValue, updatedParam } = createTestingData();

        await processor.processConfiguration(
            {
                taskCreationPayload: { configureActivity: activity } as ITaskCreationPayload,
                taskCreationFormGroupValue: taskCreationFormGroupValue
            },
            { updatedFunction: MOCK_FUNCTION_Void }
        );

        expect(dispatchSpy).not.toHaveBeenCalledWith(upsertIParam(updatedParam));
        expect(appendOutputParamSpy).not.toHaveBeenCalledWith(jasmine.any(Object), activity, updatedParam, true, processBuilderConfig.expectInterface);
        expect(removeElementsSpy).toHaveBeenCalledWith(outputTargets);
    });

    const createTestingData = () => {
        const outputTargets = [{'id': 'target1'} as IElement, {'id': 'target2'} as IElement];

        const updatedName = 'my updated name 123',
            activity = { incoming: [] as IConnector[], outgoing: outputTargets.map(target => ({ type: shapeTypes.DataOutputAssociation, target })) } as IElement,
            appendOutputParamSpy = spyOn(BPMNJsRepository, 'appendOutputParam'),
            removeElementsSpy = spyOn(modelingModule, 'removeElements');

        const taskCreationFormGroupValue = {
            outputParamName: updatedName,
            normalizedOutputParamName: ProcessBuilderRepository.normalizeName(updatedName)
        } as ITaskCreationFormGroupValue;

        const updatedParam: IParam = {
            ...MOCK_PARAM_Solution,
            name: taskCreationFormGroupValue.outputParamName,
            normalizedName: taskCreationFormGroupValue.normalizedOutputParamName,
            type: 'object'
        };

        return { activity, appendOutputParamSpy, outputTargets, removeElementsSpy, taskCreationFormGroupValue, updatedParam };
    }
});