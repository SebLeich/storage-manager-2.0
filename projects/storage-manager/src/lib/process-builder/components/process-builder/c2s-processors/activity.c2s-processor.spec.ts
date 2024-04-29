import { Store } from "@ngrx/store";
import { ActivityC2SProcessor } from "./activity.c2s-processor";
import { TestBed } from "@angular/core/testing";
import defaultImportsConstant from "@/app/default-imports.constant";
import { ProcessBuilderModule } from "@/lib/process-builder/process-builder.module";
import { provideMockStore } from "@ngrx/store/testing";
import INITIAL_STATE from "../testing/inititial-state.constant";
import { ProcessBuilderComponentService } from "../process-builder-component.service";
import { FUNCTIONS_CONFIG_TOKEN, PROCESS_BUILDER_CONFIG_TOKEN } from "@/lib/process-builder/interfaces";
import processBuilderConfig from "@/config/process-builder-config";
import { selectSnapshot } from "@/lib/process-builder/globals/select-snapshot";
import { selectFunction } from "@/lib/process-builder/store/selectors";
import MOCK_FUNCTION_Return1 from "../testing/function-return-1.constant";
import { ITaskCreationPayload } from "@/lib/process-builder/interfaces/task-creation-payload.interface";

describe('ActivityC2SProcessor', () => {
    let processor: ActivityC2SProcessor;
    let store: Store;

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
                ActivityC2SProcessor
            ]
        });
        processor = TestBed.inject(ActivityC2SProcessor);
        store = TestBed.inject(Store);
    });

    it('should create', () => {
        expect(processor).toBeTruthy();
    });

    it('should apply no changes when no task creation payload is passed', async () => {
        await processor.processConfiguration({ taskCreationPayload: undefined });
        const updatedFunction = await selectSnapshot(store.select(selectFunction(MOCK_FUNCTION_Return1.identifier)));
        expect(updatedFunction).toEqual(MOCK_FUNCTION_Return1);
    });
    
    it('should apply no changes when no activity is passed in the task creation payload', async () => {
        await processor.processConfiguration({ taskCreationPayload: { configureActivity: undefined } as ITaskCreationPayload });
        const updatedFunction = await selectSnapshot(store.select(selectFunction(MOCK_FUNCTION_Return1.identifier)));
        expect(updatedFunction).toEqual(MOCK_FUNCTION_Return1);
    });
});