import { Store } from "@ngrx/store";
import { BpmnJsService } from "@/lib/process-builder/services/bpmn-js.service";
import { IModelingModule } from "@/lib/bpmn-io/interfaces/modules";
import { TestBed } from "@angular/core/testing";
import defaultImportsConstant from "@/app/default-imports.constant";
import { ProcessBuilderModule } from "@/lib/process-builder/process-builder.module";
import { provideMockStore } from "@ngrx/store/testing";
import INITIAL_STATE from "./testing/inititial-state.constant";
import { ProcessBuilderComponentService } from "../process-builder-component.service";
import processBuilderConfig from "@/config/process-builder-config";
import { FUNCTIONS_CONFIG_TOKEN, PROCESS_BUILDER_CONFIG_TOKEN } from "@/lib/process-builder/interfaces";
import { EventC2MProcessor } from "./event.c2m-processor";

describe('EventC2MProcessor', () => {
    let processor: EventC2MProcessor;
    let store: Store;
    let bpmnJsService: BpmnJsService;
    let modelingModule: IModelingModule;

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
        store = TestBed.inject(Store);
        bpmnJsService = TestBed.inject(BpmnJsService);
        modelingModule = bpmnJsService.modelingModule;
    });

    it('should create', () => {
        expect(processor).toBeTruthy();
    });
});