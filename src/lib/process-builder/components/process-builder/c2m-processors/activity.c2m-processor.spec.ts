import { TestBed } from "@angular/core/testing";
import { ActivityC2MProcessor } from "./activity.c2m-processor";
import defaultImportsConstant from "@/app/default-imports.constant";
import { ProcessBuilderModule } from "@/lib/process-builder/process-builder.module";
import { provideMockStore } from "@ngrx/store/testing";
import { ProcessBuilderComponentService } from "../process-builder-component.service";
import { BpmnJsService } from "@/lib/process-builder/services/bpmn-js.service";
import { IModelingModule } from "@/lib/bpmn-io/interfaces/modules";
import { FUNCTIONS_CONFIG_TOKEN, PROCESS_BUILDER_CONFIG_TOKEN } from "@/lib/process-builder/interfaces";
import processBuilderConfig from "@/config/process-builder-config";
import INITIAL_STATE from "../testing/inititial-state.constant";
import { selectSnapshot } from "@/lib/process-builder/globals/select-snapshot";
import { Store } from "@ngrx/store";
import { selectIFunction } from "@/lib/process-builder/store/selectors";
import MOCK_FUNCTION_Return1 from "../testing/function-return-1.constant";
import { ITaskCreationPayload } from "@/lib/process-builder/interfaces/task-creation-payload.interface";
import ACTIVITY_FACTORY from "../../../../testing/activity-factory.constant";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { of } from "rxjs";
import { ITaskCreationFormGroupValue } from "@/lib/process-builder/interfaces/task-creation-form-group-value.interface";

describe('ActivityC2MProcessor', () => {
    let processor: ActivityC2MProcessor;
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
                ActivityC2MProcessor
            ]
        });
        processor = TestBed.inject(ActivityC2MProcessor);
        store = TestBed.inject(Store);
        bpmnJsService = TestBed.inject(BpmnJsService);
        modelingModule = bpmnJsService.modelingModule;
    });

    it('should create', () => {
        expect(processor).toBeTruthy();
    });

    it('should apply no changes when no task creation payload is passed', async () => {
        await processor.processConfiguration({ taskCreationPayload: undefined });
        const updatedFunction = await selectSnapshot(store.select(selectIFunction(MOCK_FUNCTION_Return1.identifier)));
        expect(updatedFunction).toEqual(MOCK_FUNCTION_Return1);
    });

    it('should apply no changes when no activity is passed in the task creation payload', async () => {
        await processor.processConfiguration({ taskCreationPayload: { configureActivity: undefined } as ITaskCreationPayload });
        const updatedFunction = await selectSnapshot(store.select(selectIFunction(MOCK_FUNCTION_Return1.identifier)));
        expect(updatedFunction).toEqual(MOCK_FUNCTION_Return1);
    });

    it('should remove activity if there are no updates passed and no function reference setted', async () => {
        const removedElementsSpy = spyOn(modelingModule, 'removeElements');
        const activity = ACTIVITY_FACTORY(undefined);
        await processor.processConfiguration({ taskCreationPayload: { configureActivity: activity } as ITaskCreationPayload });
        expect(removedElementsSpy).toHaveBeenCalledWith([activity]);
    });

    it('should remove activity if there are no updates passed an an invalid function reference setted', async () => {
        const removedElementsSpy = spyOn(modelingModule, 'removeElements');
        const activity = ACTIVITY_FACTORY('alphanumericFunctionId');
        await processor.processConfiguration({ taskCreationPayload: { configureActivity: activity } as ITaskCreationPayload });
        expect(removedElementsSpy).toHaveBeenCalledWith([activity]);
    });

    it('should not remove activity if there are no updates passed but a valid function reference is setted', async () => {
        const removedElementsSpy = spyOn(modelingModule, 'removeElements');
        const activity = ACTIVITY_FACTORY(MOCK_FUNCTION_Return1.identifier);
        await processor.processConfiguration({ taskCreationPayload: { configureActivity: activity } as ITaskCreationPayload });
        expect(removedElementsSpy).not.toHaveBeenCalledWith([activity]);
    });

    it('should request confirmation to delete activity if the function reference is valid but not existing', async () => {
        const removedElementsSpy = spyOn(modelingModule, 'removeElements'),
            dialogOpenSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue({ afterClosed: () => of(true) } as MatDialogRef<unknown>);

        const activity = ACTIVITY_FACTORY(0);
        await processor.processConfiguration({ taskCreationPayload: { configureActivity: activity } as ITaskCreationPayload });
        expect(dialogOpenSpy).toHaveBeenCalled();
        expect(removedElementsSpy).toHaveBeenCalledWith([activity]);
    });

    it('should remove the activity if the form group value is referencing an funtion that is not existing', async () => {
        const removedElementsSpy = spyOn(modelingModule, 'removeElements');
        const activity = ACTIVITY_FACTORY(undefined);
        await processor.processConfiguration({
            taskCreationPayload: { configureActivity: activity } as ITaskCreationPayload,
            taskCreationFormGroupValue: { functionIdentifier: 0 } as ITaskCreationFormGroupValue
        });
        expect(removedElementsSpy).toHaveBeenCalledWith([activity]);
    });
});