import { ConnectorC2MProcessor } from "./connector.c2m-processor";
import { BpmnJsService } from "@/lib/process-builder/services/bpmn-js.service";
import { IElementRegistryModule, IModelingModule } from "@/lib/bpmn-io/interfaces/modules";
import { TestBed } from "@angular/core/testing";
import defaultImportsConstant from "@/app/default-imports.constant";
import { ProcessBuilderModule } from "@/lib/process-builder/process-builder.module";
import { provideMockStore } from "@ngrx/store/testing";
import INITIAL_STATE from "../testing/inititial-state.constant";
import { ProcessBuilderComponentService } from "../process-builder-component.service";
import processBuilderConfig from "@/config/process-builder-config";
import { FUNCTIONS_CONFIG_TOKEN, PROCESS_BUILDER_CONFIG_TOKEN } from "@/lib/process-builder/interfaces";
import { IConnector } from "@/lib/bpmn-io/interfaces/connector.interface";
import { ITaskCreationFormGroupValue } from "@/lib/process-builder/interfaces/task-creation-form-group-value.interface";
import { ITaskCreationPayload } from "@/lib/process-builder/interfaces/task-creation-payload.interface";
import { BPMNJsRepository } from "@/lib/core/bpmn-js.repository";
import ExtensionElementWrapper from "@/lib/bpmn-io/testing/extension-element";

describe('ConnectorC2MProcessor', () => {
    let processor: ConnectorC2MProcessor;
    let bpmnJsService: BpmnJsService;
    let modelingModule: IModelingModule;
    let elementRegistryModule: IElementRegistryModule;

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
                ConnectorC2MProcessor
            ]
        });
        processor = TestBed.inject(ConnectorC2MProcessor);
        bpmnJsService = TestBed.inject(BpmnJsService);
        modelingModule = bpmnJsService.modelingModule;
        elementRegistryModule = bpmnJsService.elementRegistryModule;
    });

    it('should create', () => {
        expect(processor).toBeTruthy();
    });

    it('should set slpb extension and apply default connector label for entrance gateway success', async () => {
        const connector: IConnector = {
            id: 'connector',
            businessObject: {
                extensionElements: new ExtensionElementWrapper()
            } as unknown
        } as IConnector,
            updateLabelSpy = spyOn(modelingModule, 'updateLabel');

        spyOn(elementRegistryModule, 'get').and.returnValue(connector);
        await processor.processConfiguration({ taskCreationPayload: {} as ITaskCreationPayload, taskCreationFormGroupValue: { entranceGatewayType: 'Success' } as ITaskCreationFormGroupValue });

        expect(BPMNJsRepository.getSequenceFlowType(connector)).toBe('success');
        expect(updateLabelSpy).toHaveBeenCalledWith(connector, processBuilderConfig.errorGatewayConfig.successConnectionName);
    });

    it('should set slpb extension and apply default connector label for entrance gateway error', async () => {
        const connector: IConnector = {
            id: 'connector',
            businessObject: {
                extensionElements: new ExtensionElementWrapper()
            } as unknown
        } as IConnector,
            updateLabelSpy = spyOn(modelingModule, 'updateLabel');

        spyOn(elementRegistryModule, 'get').and.returnValue(connector);
        await processor.processConfiguration({ taskCreationPayload: {} as ITaskCreationPayload, taskCreationFormGroupValue: { entranceGatewayType: 'Error' } as ITaskCreationFormGroupValue });

        expect(BPMNJsRepository.getSequenceFlowType(connector)).toBe('error');
        expect(updateLabelSpy).toHaveBeenCalledWith(connector, processBuilderConfig.errorGatewayConfig.errorConnectionName);
    });
});