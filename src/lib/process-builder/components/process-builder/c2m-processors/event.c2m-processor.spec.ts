import { BpmnJsService } from "@/lib/process-builder/services/bpmn-js.service";
import { IModelingModule } from "@/lib/bpmn-io/interfaces/modules";
import { TestBed } from "@angular/core/testing";
import defaultImportsConstant from "@/app/default-imports.constant";
import { ProcessBuilderModule } from "@/lib/process-builder/process-builder.module";
import { provideMockStore } from "@ngrx/store/testing";
import INITIAL_STATE from "../testing/inititial-state.constant";
import { ProcessBuilderComponentService } from "../process-builder-component.service";
import processBuilderConfig from "@/config/process-builder-config";
import { FUNCTIONS_CONFIG_TOKEN, PROCESS_BUILDER_CONFIG_TOKEN } from "@/lib/process-builder/interfaces";
import { EventC2MProcessor } from "./event.c2m-processor";
import { ITaskCreationPayload } from "@/lib/process-builder/interfaces/task-creation-payload.interface";
import { IConnector } from "@/lib/bpmn-io/interfaces/connector.interface";
import shapeTypes from "@/lib/bpmn-io/shape-types";
import { ITaskCreationFormGroupValue } from "@/lib/process-builder/interfaces/task-creation-form-group-value.interface";

describe('EventC2MProcessor', () => {
    let processor: EventC2MProcessor,
        bpmnJsService: BpmnJsService,
        modelingModule: IModelingModule,
        appendShapeSpy: jasmine.Spy,
        removeElementsSpy: jasmine.Spy;


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
                EventC2MProcessor
            ]
        });
        processor = TestBed.inject(EventC2MProcessor);
        bpmnJsService = TestBed.inject(BpmnJsService);
        modelingModule = bpmnJsService.modelingModule;
        appendShapeSpy = spyOn(modelingModule, 'appendShape');
        removeElementsSpy = spyOn(modelingModule, 'removeElements');
    });

    it('should create', () => {
        expect(processor).toBeTruthy();
    });

    it('should not apply any changes if no form group value is passed', () => {
        processor.processConfiguration({ taskCreationPayload: { } as ITaskCreationPayload });

        expect(appendShapeSpy).not.toHaveBeenCalled();
        expect(removeElementsSpy).not.toHaveBeenCalled();
    });

    it('should remove existing end events if there are end events but the function is not finalizing the flow', async () => {
        const endEventA = { type: shapeTypes.EndEvent, incoming: [] as IConnector[] },
            endEventB = { type: shapeTypes.EndEvent, incoming: [] as IConnector[] };

        const activity = { 
            x: 0, 
            y: 0, 
            outgoing: [
                { target: endEventA },
                { target: endEventB }
            ] as IConnector[]
        };
        await processor.processConfiguration(
            {
                taskCreationPayload: { configureActivity: activity } as ITaskCreationPayload,
                taskCreationFormGroupValue: { isProcessOutput: false } as ITaskCreationFormGroupValue
            });

        expect(appendShapeSpy).not.toHaveBeenCalled();
        expect(removeElementsSpy).toHaveBeenCalledWith(jasmine.arrayContaining([endEventA, endEventB]));
    });

    it('should add new end event if there are no end events and the function is finalizing the flow', async () => {
        const activity = { 
            x: 0, 
            y: 0, 
            outgoing: [] as IConnector[]
        };
        await processor.processConfiguration(
            {
                taskCreationPayload: { configureActivity: activity } as ITaskCreationPayload,
                taskCreationFormGroupValue: { isProcessOutput: true } as ITaskCreationFormGroupValue
            });

        expect(appendShapeSpy).toHaveBeenCalledWith(activity, { type: shapeTypes.EndEvent }, jasmine.any(Object));
        expect(removeElementsSpy).not.toHaveBeenCalled();
    });
});