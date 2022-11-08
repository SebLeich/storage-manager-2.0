import { TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { IExtensionElement } from 'src/lib/bpmn-io/interfaces/extension-element.interface';
import { FUNCTIONS_CONFIG_TOKEN } from '../../globals/i-function';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from '../../globals/i-process-builder-config';
import { sebleichProcessBuilderExtension } from '../../globals/sebleich-process-builder-extension';
import { ProcessBuilderModule } from '../../process-builder.module';
import { BpmnJsService } from '../../services/bpmn-js.service';
import { GatewayType } from '../../types/gateway.type';

import { ProcessBuilderComponentService } from './process-builder-component.service';

describe('ProcessBuilderComponentService', () => {
  const processBuilderConfig = {
    errorGatewayConfig: {
      errorConnectionName: 'ERROR',
      successConnectionName: 'SUCCESS'
    }
  } as IProcessBuilderConfig;

  let service: ProcessBuilderComponentService;
  let bpmnJsService: BpmnJsService;

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

    (['Error', 'Success'] as GatewayType[]).forEach(gatewayType => {

      const incomingGatewayConnectorLabel = gatewayType === 'Error' ? processBuilderConfig.errorGatewayConfig.errorConnectionName : processBuilderConfig.errorGatewayConfig.successConnectionName;
      it(`should set correct label ${incomingGatewayConnectorLabel} to incoming connector if connector is coming from an error gateway`, () => {
        const modelingModuleMock = { 'updateLabel': (connector: object, label: string) => { } };
        const modelingModuleUpdateLabelSpy = spyOn(modelingModuleMock, 'updateLabel');
        spyOnProperty(bpmnJsService, 'modelingModule', 'get').and.returnValue(modelingModuleMock as any);

        const activityMock = { businessObject: {} };
        const connectorMock = {};
        service.applyTaskCreationConfig({
          configureActivity: activityMock,
          configureIncomingErrorGatewaySequenceFlow: connectorMock
        } as any, {
          entranceGatewayType: gatewayType
        } as any);

        expect(modelingModuleUpdateLabelSpy).toHaveBeenCalledTimes(1);
        expect(modelingModuleUpdateLabelSpy).toHaveBeenCalledWith(connectorMock, incomingGatewayConnectorLabel);
      });

    });

  });
});
