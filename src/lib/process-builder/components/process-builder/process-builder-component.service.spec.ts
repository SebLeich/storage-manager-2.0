import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { IExtensionElement } from 'src/lib/bpmn-io/interfaces/extension-element.interface';
import { IConnector } from 'src/lib/bpmn-io/interfaces/i-connector.interface';
import { IElement } from 'src/lib/bpmn-io/interfaces/i-element.interface';
import { IModelingModule } from 'src/lib/bpmn-io/interfaces/i-modeling-module.interface';
import { FUNCTIONS_CONFIG_TOKEN, IFunction } from '../../globals/i-function';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from '../../globals/i-process-builder-config';
import { sebleichProcessBuilderExtension } from '../../globals/sebleich-process-builder-extension';
import { ITaskCreationData } from '../../interfaces/i-task-creation-data.interface';
import { ProcessBuilderModule } from '../../process-builder.module';
import { BpmnJsService } from '../../services/bpmn-js.service';
import { addIFunction } from '../../store/actions/i-function.actions';
import { GatewayType } from '../../types/gateway.type';

import { ProcessBuilderComponentService } from './process-builder-component.service';

describe('ProcessBuilderComponentService', () => {
  const processBuilderConfig = {
    errorGatewayConfig: {
      errorConnectionName: 'ERROR',
      successConnectionName: 'SUCCESS'
    }
  } as IProcessBuilderConfig;

  const mockFunction = { identifier: 1 } as IFunction;

  let service: ProcessBuilderComponentService;
  let bpmnJsService: BpmnJsService;
  let modelingModule: IModelingModule;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...defaultImportsConstant,

        ProcessBuilderModule
      ],
      providers: [
        ProcessBuilderComponentService,
        {
          provide: PROCESS_BUILDER_CONFIG_TOKEN,
          useValue: processBuilderConfig
        },
        { provide: FUNCTIONS_CONFIG_TOKEN, useValue: [] }
      ]
    });
    service = TestBed.inject(ProcessBuilderComponentService);
    bpmnJsService = TestBed.inject(BpmnJsService);
    modelingModule = bpmnJsService.modelingModule;
    store = TestBed.inject(Store);

    store.dispatch(addIFunction(mockFunction));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('task creation aborted', () => {

    [
      { value: undefined, valid: false },
      { value: null, valid: false },
      { value: 'some string value', valid: false },
      { value: true, valid: false },
      { value: 0, valid: true },
      { value: 1, valid: true },
      { value: 100, valid: true },
    ].forEach(activityIdentifierConfiguration => {

      it(`should ${activityIdentifierConfiguration.valid ? 'not' : ''} remove activity if configured activity references activity with identifier ${activityIdentifierConfiguration.value}`, () => {
        const modelingModuleMock = { 'removeElements': (elements: any[]) => { } };
        const modelingModuleRemoveElementsSpy = spyOn(modelingModuleMock, 'removeElements');
        spyOnProperty(bpmnJsService, 'modelingModule', 'get').and.returnValue(modelingModuleMock as any);

        const activityExtension = {
          $instanceOf: (type) => {
            const prefix = sebleichProcessBuilderExtension.prefix;
            return type === `${prefix}:ActivityExtension`;
          },
          activityFunctionId: activityIdentifierConfiguration.value
        } as IExtensionElement;

        const activity = {
          businessObject: {
            extensionElements:
            {
              values: [activityExtension]
            }
          }
        };

        service.applyTaskCreationConfig({
          configureActivity: activity
        } as any);

        if (activityIdentifierConfiguration.valid) {
          expect(modelingModuleRemoveElementsSpy).not.toHaveBeenCalled();
        } else {
          expect(modelingModuleRemoveElementsSpy).toHaveBeenCalledTimes(1);
          expect(modelingModuleRemoveElementsSpy).toHaveBeenCalledWith([activity]);
        }
      });

    });

  });

  describe('task creation confirmed', () => {

    it('should not remove activity', () => {
      const modelingModuleMock = { 'removeElements': () => { } };
      const modelingModuleRemoveElementsSpy = spyOn(modelingModuleMock, 'removeElements');
      spyOnProperty(bpmnJsService, 'modelingModule', 'get').and.returnValue(modelingModuleMock as any);

      const activity = {
        businessObject: {}
      };
      service.applyTaskCreationConfig({
        configureActivity: activity
      } as any, {} as any);

      expect(modelingModuleRemoveElementsSpy).not.toHaveBeenCalled()
    });

    for (let gatewayType of ['Error', 'Success'] as GatewayType[]) {
      const incomingGatewayConnectorLabel = gatewayType === 'Error' ? processBuilderConfig.errorGatewayConfig.errorConnectionName : processBuilderConfig.errorGatewayConfig.successConnectionName;

      it(`should set correct label ${incomingGatewayConnectorLabel} to incoming connector if connector is coming from an error gateway`, async () => {
        modelingModule.updateLabel = (...args) => {
          console.log(args);
        }
        const updateLabelSpy = spyOn(modelingModule, 'updateLabel').and.callThrough();

        const activityMock = {
          businessObject: {},
          incoming: [] as IConnector[],
          outgoing: [] as IConnector[],
        } as IElement;

        const connectorMock = {};

        await service.applyTaskCreationConfig({
          configureActivity: activityMock,
          configureIncomingErrorGatewaySequenceFlow: connectorMock
        } as any, {
          entranceGatewayType: gatewayType,
          functionIdentifier: mockFunction.identifier
        } as ITaskCreationData);

        const count = updateLabelSpy.calls.count();
        expect(updateLabelSpy).toHaveBeenCalledTimes(1);
        expect(updateLabelSpy).toHaveBeenCalledWith(connectorMock as any, incomingGatewayConnectorLabel);
      });

    }

  });
});
