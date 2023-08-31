import { Store } from "@ngrx/store";
import { OutputC2SProcessor } from "./output.c2s-processor";
import { TestBed } from "@angular/core/testing";
import defaultImportsConstant from "@/app/default-imports.constant";
import { ProcessBuilderModule } from "@/lib/process-builder/process-builder.module";
import { provideMockStore } from "@ngrx/store/testing";
import INITIAL_STATE from "../testing/inititial-state.constant";
import { ProcessBuilderComponentService } from "../process-builder-component.service";
import { FUNCTIONS_CONFIG_TOKEN, PROCESS_BUILDER_CONFIG_TOKEN } from "@/lib/process-builder/interfaces";
import processBuilderConfig from "@/config/process-builder-config";
import MOCK_FUNCTION_Return1 from "../testing/function-return-1.constant";
import { selectSnapshot } from "@/lib/process-builder/globals/select-snapshot";
import { selectIParam } from "@/lib/process-builder/store/selectors";
import { ITaskCreationPayload } from "@/lib/process-builder/interfaces/task-creation-payload.interface";
import { ITaskCreationFormGroupValue } from "@/lib/process-builder/interfaces/task-creation-form-group-value.interface";

describe('OutputC2SProcessor', () => {
    let processor: OutputC2SProcessor;
    let store: Store;
    let storeDispatchSpy: jasmine.Spy;

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
                OutputC2SProcessor
            ]
        });
        processor = TestBed.inject(OutputC2SProcessor);
        store = TestBed.inject(Store);
        storeDispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    });

    it('should create', () => {
        expect(processor).toBeTruthy();
    });

    it('should apply no changes when no form group value is passed', async () => {
        await processor.processConfiguration({ taskCreationPayload: { configureActivity: { } } as ITaskCreationPayload, taskCreationFormGroupValue: undefined });

        expect(storeDispatchSpy).not.toHaveBeenCalled();
    });
    
    it('should apply no changes when no activity is passed in the task creation payload', async () => {
        await processor.processConfiguration({ taskCreationPayload: { configureActivity: undefined } as ITaskCreationPayload, taskCreationFormGroupValue: { } as ITaskCreationFormGroupValue });

        expect(storeDispatchSpy).not.toHaveBeenCalled();
    });
});
