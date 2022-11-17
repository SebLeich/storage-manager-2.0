import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { IExtensionElement } from 'src/lib/bpmn-io/interfaces/extension-element.interface';
import { IConnector } from 'src/lib/bpmn-io/interfaces/connector.interface';
import { IElement } from 'src/lib/bpmn-io/interfaces/element.interface';
import { IModelingModule } from 'src/lib/bpmn-io/interfaces/modeling-module.interface';
import shapeTypes from 'src/lib/bpmn-io/shape-types';
import { FUNCTIONS_CONFIG_TOKEN, IFunction } from '../../globals/i-function';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from '../../globals/i-process-builder-config';
import { sebleichProcessBuilderExtension } from '../../globals/sebleich-process-builder-extension';
import { ITaskCreationData } from '../../interfaces/i-task-creation-data.interface';
import { ITaskCreationPayload } from '../../interfaces/i-task-creation-payload.interface';
import { ProcessBuilderModule } from '../../process-builder.module';
import { BpmnJsService } from '../../services/bpmn-js.service';
import { addIFunction, updateIFunction, upsertIFunction } from '../../store/actions/i-function.actions';
import { GatewayType } from '../../types/gateway.type';

import { ProcessBuilderComponentService } from './process-builder-component.service';
import { ProcessBuilderRepository } from 'src/lib/core/process-builder-repository';
import { selectSnapshot } from '../../globals/select-snapshot';
import { selectIFunction } from '../../store/selectors/i-function.selector';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from '../../store/reducers/i-function.reducer';

describe('ProcessBuilderComponentService', () => {
  const processBuilderConfig = {
    errorGatewayConfig: {
      errorConnectionName: 'ERROR',
      successConnectionName: 'SUCCESS'
    }
  } as IProcessBuilderConfig;

  const mockName = 'FUNCTION_NORMALIZED_NAME';
  const mockFunction = {
    identifier: 1,
    customImplementation: ['return 1;'],
    name: mockName,
    normalizedName: ProcessBuilderRepository.normalizeName(mockName),
    inputParams: [],
    output: null,
    canFail: false
  } as IFunction;

  let service: ProcessBuilderComponentService;
  let bpmnJsService: BpmnJsService;
  let modelingModule: IModelingModule;
  let mockStore: MockStore;

  const initialState = {
    'Func': {
      entities: {
        1: mockFunction
      },
      ids: [mockFunction.identifier]
    } as State
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...defaultImportsConstant,

        ProcessBuilderModule
      ],
      providers: [
        provideMockStore({ initialState }),
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
    mockStore = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('task creation aborted', () => {

    for (var activityIdentifierConfiguration of [
      { value: undefined, valid: false },
      { value: null, valid: false },
      { value: 'some string value', valid: false },
      { value: true, valid: false },
      { value: 0, valid: false },
      { value: 1, valid: true },
      { value: 100, valid: false },
    ]) {

      it(`should ${activityIdentifierConfiguration.valid ? 'not' : ''} remove activity if configured activity references activity with identifier ${activityIdentifierConfiguration.value}`, async () => {
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
          },
          incoming: [
            {
              type: shapeTypes.DataInputAssociation
            } as IConnector,

          ]
        } as IElement;

        await service.applyTaskCreationConfig({
          configureActivity: activity
        } as any, {
          functionIdentifier: activityIdentifierConfiguration.value
        } as ITaskCreationData);

        if (activityIdentifierConfiguration.valid) {
          expect(modelingModuleRemoveElementsSpy).not.toHaveBeenCalled();
        } else {
          expect(modelingModuleRemoveElementsSpy).toHaveBeenCalledTimes(1);
          expect(modelingModuleRemoveElementsSpy).toHaveBeenCalledWith([activity]);
        }
      });

    }

    it('should not apply function configuration', async () => {
      modelingModule.updateLabel = (...args) => { }
      const activityMock = {
        businessObject: {},
        incoming: [] as IConnector[],
        outgoing: [] as IConnector[],
      } as IElement;

      const store = TestBed.inject(Store);
      const storeSpy = spyOn(store, 'dispatch');

      const connectorMock = {};
      const updatedCanFail = true;
      const updatedName = 'some new value';
      const updatedNormalizedName = ProcessBuilderRepository.normalizeName(updatedName);

      await service.applyTaskCreationConfig({
        configureActivity: activityMock,
        configureIncomingErrorGatewaySequenceFlow: connectorMock
      } as ITaskCreationPayload, {
        functionIdentifier: null,
        canFail: updatedCanFail,
        normalizedName: updatedNormalizedName,
        name: updatedName,
        implementation: [`return ${updatedNormalizedName};`]
      } as ITaskCreationData);

      const calls = storeSpy.calls.all();
      expect(storeSpy).not.toHaveBeenCalled();
    });

  });

  describe('task creation confirmed', () => {

    for (var activityIdentifierConfiguration of [
      { value: undefined, valid: false },
      { value: null, valid: false },
      { value: 'some string value', valid: false },
      { value: true, valid: false },
      { value: 0, valid: false },
      { value: 1, valid: true },
      { value: 100, valid: false },
    ]) {

      it(`should ${activityIdentifierConfiguration.valid ? 'not' : ''} remove activity if configured activity references activity with identifier ${activityIdentifierConfiguration.value}`, async () => {
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

        await service.applyTaskCreationConfig({
          configureActivity: activity
        } as any, {
          functionIdentifier: activityIdentifierConfiguration.value
        } as ITaskCreationData);

        if (activityIdentifierConfiguration.valid) {
          expect(modelingModuleRemoveElementsSpy).not.toHaveBeenCalled();
        } else {
          expect(modelingModuleRemoveElementsSpy).toHaveBeenCalledTimes(1);
          expect(modelingModuleRemoveElementsSpy).toHaveBeenCalledWith([activity]);
        }
      });

    }

    for (let gatewayType of ['Error', 'Success'] as GatewayType[]) {
      const incomingGatewayConnectorLabel = gatewayType === 'Error' ? processBuilderConfig.errorGatewayConfig.errorConnectionName : processBuilderConfig.errorGatewayConfig.successConnectionName;

      it(`should set correct label ${incomingGatewayConnectorLabel} to incoming connector if connector is coming from an error gateway`, async () => {
        modelingModule.updateLabel = (...args) => { }
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
        } as ITaskCreationPayload, {
          entranceGatewayType: gatewayType,
          functionIdentifier: mockFunction.identifier
        } as ITaskCreationData);

        expect(updateLabelSpy).toHaveBeenCalled();
        expect(updateLabelSpy).toHaveBeenCalledWith(connectorMock as any, incomingGatewayConnectorLabel);
      });

    }

    it('should apply function configuration correctly', async () => {
      modelingModule.updateLabel = (...args) => { }
      const activityMock = {
        businessObject: {},
        incoming: [] as IConnector[],
        outgoing: [] as IConnector[],
      } as IElement;

      const store = TestBed.inject(Store);
      const storeSpy = spyOn(store, 'dispatch');

      const connectorMock = {};
      const updatedCanFail = true;
      const updatedName = 'some new value';
      const updatedNormalizedName = ProcessBuilderRepository.normalizeName(updatedName);
      const implementation = [`return ${updatedNormalizedName};`];

      await service.applyTaskCreationConfig({
        configureActivity: activityMock,
        configureIncomingErrorGatewaySequenceFlow: connectorMock
      } as ITaskCreationPayload, {
        functionIdentifier: mockFunction.identifier,
        canFail: updatedCanFail,
        normalizedName: updatedNormalizedName,
        name: updatedName,
        implementation: implementation
      } as ITaskCreationData);

      const calls = storeSpy.calls.all();
      expect(storeSpy).toHaveBeenCalledTimes(1);
      expect(calls).toHaveSize(1);
      expect(calls[0].args).toHaveSize(1);
      expect(calls[0].args[0].type).toBe(upsertIFunction.type);
      expect((calls[0].args[0] as any)?.func?.name).toBe(updatedName);
      expect((calls[0].args[0] as any)?.func?.normalizedName).toBe(updatedNormalizedName);
      expect((calls[0].args[0] as any)?.func?.customImplementation).toEqual(implementation);
      expect((calls[0].args[0] as any)?.func?.canFail).toBe(updatedCanFail);
      expect((calls[0].args[0] as any)?.func?.identifier).toBe(mockFunction.identifier);
    });

  });
});
