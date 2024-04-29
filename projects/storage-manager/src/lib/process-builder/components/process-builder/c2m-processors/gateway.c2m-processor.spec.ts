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
import { GatewayC2MProcessor } from "./gateway.c2m-processor";
import { ITaskCreationPayload } from "@/lib/process-builder/interfaces/task-creation-payload.interface";
import { ITaskCreationFormGroupValue } from "@/lib/process-builder/interfaces/task-creation-form-group-value.interface";

describe('GatewayC2MProcessor', () => {
    let processor: GatewayC2MProcessor,
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
                GatewayC2MProcessor
            ]
        });

        processor = TestBed.inject(GatewayC2MProcessor);
        bpmnJsService = TestBed.inject(BpmnJsService);
        modelingModule = bpmnJsService.modelingModule;
        appendShapeSpy = spyOn(modelingModule, 'appendShape');
        removeElementsSpy = spyOn(modelingModule, 'removeElements');
    });

    it('should create', () => {
        expect(processor).toBeTruthy();
    });

    it('should not apply any changes if no activity is passed', () => {
        processor.processConfiguration({
            taskCreationPayload: {} as ITaskCreationPayload,
            taskCreationFormGroupValue: {} as ITaskCreationFormGroupValue
        });

        expect(appendShapeSpy).not.toHaveBeenCalled();
        expect(removeElementsSpy).not.toHaveBeenCalled();
    });

    it('should not apply any changes if no form value is passed', () => {
        processor.processConfiguration({ taskCreationPayload: { configureActivity: {} } as ITaskCreationPayload });

        expect(appendShapeSpy).not.toHaveBeenCalled();
        expect(removeElementsSpy).not.toHaveBeenCalled();
    });
});