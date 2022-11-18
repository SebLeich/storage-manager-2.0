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
import { upsertIFunction } from '../../store/actions/i-function.actions';
import { GatewayType } from '../../types/gateway.type';

import { ProcessBuilderComponentService } from './process-builder-component.service';
import { ProcessBuilderRepository } from 'src/lib/core/process-builder-repository';
import { provideMockStore } from '@ngrx/store/testing';
import { State } from '../../store/reducers/i-function.reducer';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js.repository';
import { upsertIParam } from '../../store/actions/i-param.actions';
import { IParam } from '../../globals/i-param';
import { INJECTOR_INTERFACE_TOKEN, INJECTOR_TOKEN } from '../../globals/injector';
import { deepObjectLookup } from 'src/lib/shared/globals/deep-object-lookup.function';

describe('ProcessBuilderComponentService', () => {
  const processBuilderConfig = {
    errorGatewayConfig: {
      errorConnectionName: 'ERROR',
      successConnectionName: 'SUCCESS'
    }
  } as IProcessBuilderConfig;

  const injectorInterface = {
    injector: {
      myValue: {
        myProperty: { type: 'string' },
        anotherProperty: { type: 'boolean' },
        something: { type: 'array' }
      }
    }
  };
  const injector = {
    injector: {
      myValue: {
        myProperty: 'my value',
        anotherProperty: true,
        something: [
          'hello'
        ]
      }
    }
  };

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
        { provide: FUNCTIONS_CONFIG_TOKEN, useValue: [] },
        { provide: INJECTOR_INTERFACE_TOKEN, useValue: injectorInterface },
        { provide: INJECTOR_TOKEN, useValue: injector },
      ]
    });
    service = TestBed.inject(ProcessBuilderComponentService);
    bpmnJsService = TestBed.inject(BpmnJsService);
    modelingModule = bpmnJsService.modelingModule;
  });

  it('should create', () => {
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

      it(`should ${activityIdentifierConfiguration.valid ? 'not ' : ''}remove activity if configured activity references activity with identifier ${activityIdentifierConfiguration.value}`, async () => {
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

    [true, false].forEach(finalizesFlow => {

      it(`should ${finalizesFlow ? '' : 'not '}append sequence flow end event if function ${finalizesFlow ? '' : 'not '}finalizes flow`, async () => {
        modelingModule.updateLabel = (...args) => { }
        const activityMock = {
          businessObject: {},
          incoming: [] as IConnector[],
          outgoing: [] as IConnector[],
        } as IElement;

        const modelingModuleAppendShapeSpy = spyOn(modelingModule, 'appendShape');

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
          implementation: implementation,
          isProcessOutput: finalizesFlow
        } as ITaskCreationData);

        const calls = modelingModuleAppendShapeSpy.calls.all();
        if (finalizesFlow) {
          expect(modelingModuleAppendShapeSpy).toHaveBeenCalledTimes(1);
          expect(calls.some(call => call.args[0] === activityMock && call.args[1].type === 'bpmn:EndEvent')).toBeTrue();
        } else {
          expect(modelingModuleAppendShapeSpy).not.toHaveBeenCalled();
        }

      });

    });

    [true, false].forEach(finalizesFlow => {

      it(`should ${finalizesFlow ? 'not ' : ''}remove sequence flow end event if end event exists and function ${finalizesFlow ? 'not ' : ''}finalizes flow`, async () => {
        modelingModule.updateLabel = (...args) => { }
        let sequenceFlow = {
          type: "bpmn:SequenceFlow",
          target: {
            type: 'bpmn:EndEvent',
            incoming: [] as any[]
          }
        };
        sequenceFlow.target.incoming.push(sequenceFlow);

        const activityMock = {
          businessObject: {},
          incoming: [] as IConnector[],
          outgoing: [sequenceFlow] as IConnector[],
        } as IElement;

        const modelingModuleRemoveShapeSpy = spyOn(modelingModule, 'removeElements');

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
          implementation: implementation,
          isProcessOutput: finalizesFlow
        } as ITaskCreationData);

        const calls = modelingModuleRemoveShapeSpy.calls.all();
        const deletedElements = calls.flatMap(call => call.args.flatMap(arg => arg));
        const outgoingElements = [sequenceFlow.target, sequenceFlow];
        if (finalizesFlow) {
          expect(outgoingElements.some(element => deletedElements.indexOf(element as any) > -1)).toBeFalse();
        } else {
          expect(modelingModuleRemoveShapeSpy).toHaveBeenCalled();
          expect(outgoingElements.every(element => deletedElements.indexOf(element as any) > -1)).toBeTrue();
        }

      });

    });

    it('should update bpmn activity function identifier', async () => {
      modelingModule.updateLabel = (...args) => { }
      const activityMock = {
        businessObject: {},
        incoming: [] as IConnector[],
        outgoing: [] as IConnector[],
      } as IElement;

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

      const settedActivityIdentifier = BPMNJsRepository.getSLPBExtension(activityMock.businessObject, 'ActivityExtension', (e: any) => e.activityFunctionId);
      expect(settedActivityIdentifier).toBe(mockFunction.identifier);
    });

    it('should update bpmn activity function name', async () => {
      modelingModule.updateLabel = (...args) => { }
      const modelingModuleAppendShapeSpy = spyOn(modelingModule, 'updateLabel');

      const activityMock = {
        businessObject: {},
        incoming: [] as IConnector[],
        outgoing: [] as IConnector[],
      } as IElement;

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

      const calls = modelingModuleAppendShapeSpy.calls.all();
      expect(modelingModuleAppendShapeSpy).toHaveBeenCalled();
      expect(calls.some(call => call.args[0] === activityMock && call.args[1] === updatedName)).toBeTrue();
    });

    [
      { value: { "myProperty": 100 } },
      { value: 1.501 },
      { value: 1 },
      { value: 10065.123 },
      { value: '"my custom string"' },
      { value: 'injector.myValue', injectorType: 'object' },
      { value: 'injector.myValue.myProperty', injectorType: 'string' },
      { value: 'injector.myValue.anotherProperty', injectorType: 'boolean' },
      { value: ['value1', 'value2'] },
      { value: true },
      { value: false },
    ].forEach(entry => {
      const value = entry.injectorType ? deepObjectLookup(injector, entry.value) : entry.value;
      const title = typeof value === 'object' ? JSON.stringify(value) : value;
      const stringifiedValue = typeof entry.value === 'object' ? JSON.stringify(entry.value) : entry.value.toString();
      const parsedType = entry.injectorType ?? (typeof entry.value === 'object' && Array.isArray(entry.value) ? 'array' : typeof entry.value);

      it(`should correctly apply output param configuration ${title} (${parsedType}${entry.injectorType ? ', from injector' : ''})`, async () => {
        modelingModule.updateLabel = (...args) => { }
        spyOn(BPMNJsRepository, 'appendOutputParam');

        const store = TestBed.inject(Store);
        const storeSpy = spyOn(store, 'dispatch');
        const activityMock = {
          businessObject: {},
          children: [],
          incoming: [] as IConnector[],
          outgoing: [] as IConnector[],
          x: 0,
          y: 0
        } as IElement;
        const connectorMock = {};
        const updatedCanFail = true;
        const updatedName = 'some new value';
        const updatedNormalizedName = ProcessBuilderRepository.normalizeName(updatedName);
        const outputParamName = 'My Object';
        const normalizedOutputParamName = ProcessBuilderRepository.normalizeName(outputParamName);
        const implementation = [
          'async (injector) => {',
          `return ${stringifiedValue};`,
          '}',
        ];

        await service.applyTaskCreationConfig({
          configureActivity: activityMock,
          configureIncomingErrorGatewaySequenceFlow: connectorMock
        } as ITaskCreationPayload, {
          functionIdentifier: mockFunction.identifier,
          canFail: updatedCanFail,
          normalizedName: updatedNormalizedName,
          name: updatedName,
          implementation: implementation,
          outputParamName: outputParamName,
          normalizedOutputParamName: normalizedOutputParamName
        } as ITaskCreationData);

        expect(storeSpy).toHaveBeenCalled();

        const calls = storeSpy.calls.all();
        const upsertIParamCall = calls.find(call => call.args[0].type === upsertIParam.type);
        expect(upsertIParamCall).toBeTruthy();

        expect(((upsertIParamCall?.args[0] as any).param as IParam).name).toBe(outputParamName);
        expect(((upsertIParamCall?.args[0] as any).param as IParam).normalizedName).toBe(normalizedOutputParamName);
        expect(((upsertIParamCall?.args[0] as any).param as IParam).type).toBe(parsedType);

        const finiteValue = entry.injectorType ? deepObjectLookup(injector, entry.value) : entry.value;
        expect(((upsertIParamCall?.args[0] as any).param as IParam).defaultValue).toEqual(finiteValue);
      });

      it(`should correctly append output param ${title} (${parsedType}) to activity`, async () => {
        modelingModule.updateLabel = (...args) => { }

        const appendOutputParamSpy = spyOn(BPMNJsRepository, 'appendOutputParam');
        const activityMock = {
          businessObject: {},
          children: [],
          incoming: [] as IConnector[],
          outgoing: [] as IConnector[],
          x: 0,
          y: 0
        } as IElement;
        const connectorMock = {};
        const updatedCanFail = true;
        const updatedName = 'some new value';
        const updatedNormalizedName = ProcessBuilderRepository.normalizeName(updatedName);
        const outputParamName = 'My Object';
        const normalizedOutputParamName = ProcessBuilderRepository.normalizeName(outputParamName);
        const implementation = [
          'async (injector) => {',
          `return ${stringifiedValue};`,
          '}',
        ];

        const result = await service.applyTaskCreationConfig({
          configureActivity: activityMock,
          configureIncomingErrorGatewaySequenceFlow: connectorMock
        } as ITaskCreationPayload, {
          functionIdentifier: mockFunction.identifier,
          canFail: updatedCanFail,
          normalizedName: updatedNormalizedName,
          name: updatedName,
          implementation: implementation,
          outputParamName: outputParamName,
          normalizedOutputParamName: normalizedOutputParamName
        } as ITaskCreationData);

        expect(appendOutputParamSpy).toHaveBeenCalledTimes(1);
        expect(appendOutputParamSpy).toHaveBeenCalledWith(bpmnJsService.bpmnJs, activityMock, result?.outputParam, true, result?.outputParam?.interface ?? undefined);
      })

    });

  });
});


