/*
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { IExtensionElement } from 'src/lib/bpmn-io/interfaces/extension-element.interface';
import { IConnector } from 'src/lib/bpmn-io/interfaces/connector.interface';
import { IElement } from 'src/lib/bpmn-io/interfaces/element.interface';
import { IElementRegistryModule, IModelingModule } from '@bpmn-io/modules';
import shapeTypes from 'src/lib/bpmn-io/shape-types';
import { FUNCTIONS_CONFIG_TOKEN, IFunction } from '../../interfaces/function.interface';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from '../../interfaces/process-builder-config.interface';
import { sebleichProcessBuilderExtension } from '../../globals/sebleich-process-builder-extension';
import { ITaskCreationPayload } from '../../interfaces/task-creation-payload.interface';
import { ProcessBuilderModule } from '../../process-builder.module';
import { BpmnJsService } from '../../services/bpmn-js.service';
import { upsertIFunction } from '../../store/actions/function.actions';
import { GatewayType } from '../../types/gateway.type';

import { ProcessBuilderComponentService } from './process-builder-component.service';
import { ProcessBuilderRepository } from 'src/lib/core/process-builder-repository';
import { provideMockStore } from '@ngrx/store/testing';
import * as fromIFunction from '../../store/reducers/function.reducer';
import * as fromInjectionContext from '../../store/reducers/injection-context.reducer';
import * as fromIParam from '../../store/reducers/param.reducer';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js.repository';
import { upsertIParam } from '../../store/actions/param.actions';
import { IParam } from '../../interfaces/param.interface';
import { deepObjectLookup } from 'src/lib/shared/globals/deep-object-lookup.function';
import { ITaskCreationFormGroupValue } from '../../interfaces/task-creation-form-group-value.interface';
import { CodemirrorRepository } from 'src/lib/core/codemirror.repository';

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
    inputTemplates: [],
    output: null,
    canFail: false,
    inputs: [],
    requireCustomImplementation: false,
    outputTemplate: null,
    requireStaticOutputDefinition: false
  } as IFunction;

  let service: ProcessBuilderComponentService;
  let bpmnJsService: BpmnJsService;
  let modelingModule: IModelingModule;
  let elementRegistryModule: IElementRegistryModule;

  const initialState = {
    [fromIFunction.featureKey]: {
      entities: {
        1: mockFunction
      },
      ids: [mockFunction.identifier]
    } as fromIFunction.State,
    [fromInjectionContext.featureKey]: {
      values: injector,
      interfaces: injectorInterface
    } as fromInjectionContext.State,
    [fromIParam.featureKey]: {
      entities: {},
      ids: []
    } as fromIParam.State
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
      ]
    });
    service = TestBed.inject(ProcessBuilderComponentService);
    bpmnJsService = TestBed.inject(BpmnJsService);
    modelingModule = bpmnJsService.modelingModule;
    elementRegistryModule = bpmnJsService.elementRegistryModule;
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('task creation aborted', () => {

    for (const activityIdentifierConfiguration of [
      { value: undefined, valid: false },
      { value: null, valid: false },
      { value: 'some string value', valid: false },
      { value: true, valid: false },
      { value: 0, valid: false },
      { value: 1, valid: false },
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
              type: shapeTypes.DataInputAssociation,
              source: {}
            } as IConnector,

          ],
          outgoing: []
        };

        await service.applyTaskCreationConfig({
          configureActivity: activity
        } as any, {
          functionIdentifier: activityIdentifierConfiguration.value
        } as ITaskCreationFormGroupValue);

        if (activityIdentifierConfiguration.valid) {
          expect(modelingModuleRemoveElementsSpy).not.toHaveBeenCalled();
        } else {
          expect(modelingModuleRemoveElementsSpy).toHaveBeenCalledTimes(1);
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
        implementation: CodemirrorRepository.stringToTextLeaf(`return ${updatedNormalizedName};`)
      } as ITaskCreationFormGroupValue);

      expect(storeSpy).not.toHaveBeenCalled();
    });

  });

  describe('task creation confirmed', () => {

    for (const activityIdentifierConfiguration of [
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
          },
          outgoing: [],
          incoming: []
        };

        await service.applyTaskCreationConfig({
          configureActivity: activity
        } as any, {
          functionIdentifier: activityIdentifierConfiguration.value
        } as ITaskCreationFormGroupValue);

        if (activityIdentifierConfiguration.valid) {
          expect(modelingModuleRemoveElementsSpy).not.toHaveBeenCalled();
        } else {
          expect(modelingModuleRemoveElementsSpy).toHaveBeenCalledTimes(1);
          expect(modelingModuleRemoveElementsSpy).toHaveBeenCalledWith([activity]);
        }
      });

    }

    for (const gatewayType of ['Error', 'Success'] as GatewayType[]) {
      const incomingGatewayConnectorLabel = gatewayType === 'Error' ? processBuilderConfig.errorGatewayConfig.errorConnectionName : processBuilderConfig.errorGatewayConfig.successConnectionName;

      it(`should set correct label ${incomingGatewayConnectorLabel} to incoming connector if connector is coming from an error gateway`, async () => {
        modelingModule.updateLabel = (...args) => { }
        spyOn(modelingModule, 'appendShape').and.returnValue({
          businessObject: {
            extensionElements: {}
          },
          children: []
        } as IElement);
        const updateLabelSpy = spyOn(modelingModule, 'updateLabel').and.callThrough();

        const connectorMock = {
          businessObject: {
            extensionElements: {
              get: () => ({
                push: () => {}
              })
            }
          }
        } as any;
        spyOn(elementRegistryModule, 'get').and.returnValue(connectorMock);

        const activityMock = {
          businessObject: {},
          incoming: [] as IConnector[],
          outgoing: [] as IConnector[],
        } as IElement;

        await service.applyTaskCreationConfig({
          configureActivity: activityMock,
          configureIncomingErrorGatewaySequenceFlow: connectorMock
        } as ITaskCreationPayload, {
          entranceGatewayType: gatewayType,
          functionIdentifier: mockFunction.identifier
        } as ITaskCreationFormGroupValue);

        expect(updateLabelSpy).toHaveBeenCalled();
        expect(updateLabelSpy).toHaveBeenCalledWith(connectorMock as any, incomingGatewayConnectorLabel);
      });

    }

    it('should apply function configuration correctly', async () => {
      modelingModule.updateLabel = (...args) => { }
      spyOn(modelingModule, 'appendShape').and.returnValue({
        businessObject: {},
        children: []
      } as IElement);
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
      const implementation = CodemirrorRepository.stringToTextLeaf(`return ${updatedNormalizedName};`);

      await service.applyTaskCreationConfig({
        configureActivity: activityMock,
        configureIncomingErrorGatewaySequenceFlow: connectorMock
      } as ITaskCreationPayload, {
        functionIdentifier: mockFunction.identifier,
        canFail: updatedCanFail,
        normalizedName: updatedNormalizedName,
        name: updatedName,
        implementation: implementation
      } as ITaskCreationFormGroupValue);

      const calls = storeSpy.calls.all();
      expect(storeSpy).toHaveBeenCalled();
      expect(calls[0].args).toHaveSize(1);
      expect(calls[0].args[0].type).toBe(upsertIFunction.type);
      expect((calls[0].args[0] as any)?.func?.name).toBe(updatedName);
      expect((calls[0].args[0] as any)?.func?.normalizedName).toBe(updatedNormalizedName);
      expect((calls[0].args[0] as any)?.func?.customImplementation).toEqual(implementation.text);
      expect((calls[0].args[0] as any)?.func?.canFail).toBe(updatedCanFail);
      expect((calls[0].args[0] as any)?.func?.identifier).toBe(mockFunction.identifier);
    });

    describe('Activity Process Termination End Event', () => {

      [true, false].forEach(finalizesFlow => {

        it(`should ${finalizesFlow ? '' : 'not '}append sequence flow end event if function ${finalizesFlow ? '' : 'not '}finalizes flow`, async () => {
          modelingModule.updateLabel = (...args) => { }
          const activityMock = {
            businessObject: {},
            incoming: [] as IConnector[],
            outgoing: [] as IConnector[],
          } as IElement;

          const modelingModuleAppendShapeSpy = spyOn(modelingModule, 'appendShape').and.returnValue({
            businessObject: {},
            children: []
          } as IElement);

          const connectorMock = {};
          const updatedCanFail = true;
          const updatedName = 'some new value';
          const updatedNormalizedName = ProcessBuilderRepository.normalizeName(updatedName);
          const implementation = CodemirrorRepository.stringToTextLeaf(`return ${updatedNormalizedName};`);

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
          } as ITaskCreationFormGroupValue);

          const calls = modelingModuleAppendShapeSpy.calls.all();
          if (finalizesFlow) {
            expect(modelingModuleAppendShapeSpy).toHaveBeenCalled();
            expect(calls.some(call => call.args[0] === activityMock && call.args[1].type === 'bpmn:EndEvent')).toBeTrue();
          } else {
            expect(calls.some(call => call.args[0] === activityMock && call.args[1].type === 'bpmn:EndEvent')).toBeFalse();
          }

        });

        it(`should ${finalizesFlow ? 'not ' : ''}remove sequence flow end event if end event exists and function ${finalizesFlow ? 'not ' : ''}finalizes flow`, async () => {
          modelingModule.updateLabel = (...args) => { }
          spyOn(modelingModule, 'appendShape').and.returnValue({
            businessObject: {},
            children: []
          } as IElement);
          const sequenceFlow = {
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
          const updatedName = 'some new value';
          const updatedNormalizedName = ProcessBuilderRepository.normalizeName(updatedName);
          const implementation = CodemirrorRepository.stringToTextLeaf(`return ${updatedNormalizedName};`);

          await service.applyTaskCreationConfig({
            configureActivity: activityMock,
            configureIncomingErrorGatewaySequenceFlow: connectorMock
          } as ITaskCreationPayload, {
            functionIdentifier: mockFunction.identifier,
            canFail: false,
            normalizedName: updatedNormalizedName,
            name: updatedName,
            implementation: implementation,
            isProcessOutput: finalizesFlow
          } as ITaskCreationFormGroupValue);

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

    });

    it('should update bpmn activity function identifier', async () => {
      modelingModule.updateLabel = (...args) => { }
      spyOn(modelingModule, 'appendShape').and.returnValue({
        businessObject: {},
        children: []
      } as IElement);
      const activityMock = {
        businessObject: {},
        incoming: [] as IConnector[],
        outgoing: [] as IConnector[],
      } as IElement;

      const connectorMock = {};
      const updatedCanFail = true;
      const updatedName = 'some new value';
      const updatedNormalizedName = ProcessBuilderRepository.normalizeName(updatedName);
      const implementation = CodemirrorRepository.stringToTextLeaf(`return ${updatedNormalizedName};`);

      await service.applyTaskCreationConfig({
        configureActivity: activityMock,
        configureIncomingErrorGatewaySequenceFlow: connectorMock
      } as ITaskCreationPayload, {
        functionIdentifier: mockFunction.identifier,
        canFail: updatedCanFail,
        normalizedName: updatedNormalizedName,
        name: updatedName,
        implementation: implementation
      } as ITaskCreationFormGroupValue);

      const settedActivityIdentifier = BPMNJsRepository.getSLPBExtension(activityMock.businessObject, 'ActivityExtension', (e: any) => e.activityFunctionId);
      expect(settedActivityIdentifier).toBe(mockFunction.identifier);
    });

    [
      { canFail: false, existingGateway: null, followingTask: null },
      { canFail: true, existingGateway: null, followingTask: null },
      { canFail: false, existingGateway: { businessObject: {}, incoming: [], outgoing: [] } as any, followingTask: null },
      { canFail: true, existingGateway: { businessObject: {}, incoming: [], outgoing: [] } as any, followingTask: null },
      { canFail: false, existingGateway: null, followingTask: { businessObject: {} } },
      { canFail: true, existingGateway: null, followingTask: { businessObject: {} } },
      { canFail: false, existingGateway: { businessObject: {}, incoming: [], outgoing: [] } as any, followingTask: { businessObject: {} } },
      { canFail: true, existingGateway: { businessObject: {}, incoming: [], outgoing: [] } as any, followingTask: { businessObject: {} } }
    ].forEach(configuration => {

      const shouldAppend = configuration.canFail && !configuration.existingGateway;
      const shouldDelete = !configuration.canFail && configuration.existingGateway;
      const shouldReconnectGatewayToSuccessor = shouldAppend && configuration.followingTask;

      it(`should ${shouldAppend ? 'append' : shouldDelete ? 'delete' : 'neither delete nor append'} error gateway ${shouldReconnectGatewayToSuccessor ? 'and reconnect the successor' : ''} (${configuration.canFail}, ${!!configuration.existingGateway}, ${configuration.followingTask})`, async () => {
        modelingModule.updateLabel = (...args) => { }
        spyOn(BPMNJsRepository, 'appendOutputParam');

        const appendShapeSpy = spyOn(modelingModule, 'appendShape').and.returnValue({
          businessObject: {},
          children: []
        } as IElement);
        const removeShapeSpy = spyOn(modelingModule, 'removeElements');


        const outgoing: IConnector[] = [], incoming: IConnector[] = [];
        const activityMock = {
          businessObject: {},
          children: [],
          incoming: incoming,
          outgoing: outgoing,
          x: 0,
          y: 0
        } as IElement;

        if (configuration.existingGateway) {
          outgoing.push({
            type: shapeTypes.SequenceFlow,
            source: activityMock,
            target: configuration.existingGateway,
            businessObject: {}
          } as IConnector);
        }

        if (shouldDelete) {
          configuration.existingGateway.outgoing = [
            {
              businessObject: {},
              source: configuration.existingGateway,
              target: {},
              type: shapeTypes.SequenceFlow
            } as IConnector
          ];
        }

        if (shouldReconnectGatewayToSuccessor) {
          outgoing.push({
            businessObject: {},
            source: activityMock,
            target: configuration.followingTask,
            type: shapeTypes.SequenceFlow
          } as IConnector);
        }

        const connectorMock = {
          businessObject: {
            extensionElements: {
              get: () => ({
                push: () => {}
              })
            }
          }
        } as any;
        const connectShapeSpy = spyOn(modelingModule, 'connect').and.returnValue(connectorMock);
        spyOn(elementRegistryModule, 'get').and.returnValue(connectorMock);

        const updatedName = 'some new value';
        const updatedNormalizedName = ProcessBuilderRepository.normalizeName(updatedName);
        const outputParamName = 'My Object';
        const normalizedOutputParamName = ProcessBuilderRepository.normalizeName(outputParamName);

        const result = await service.applyTaskCreationConfig({
          configureActivity: activityMock,
          configureIncomingErrorGatewaySequenceFlow: connectorMock
        } as ITaskCreationPayload, {
          entranceGatewayType: null,
          functionIdentifier: mockFunction.identifier,
          canFail: configuration.canFail,
          normalizedName: updatedNormalizedName,
          name: updatedName,
          outputParamName: outputParamName,
          normalizedOutputParamName: normalizedOutputParamName
        } as ITaskCreationFormGroupValue);

        if (shouldAppend) {
          expect(appendShapeSpy).toHaveBeenCalledWith(activityMock, { type: shapeTypes.ExclusiveGateway }, { x: 200, y: 40 });
        }

        if (shouldDelete) {
          const removedElements = removeShapeSpy.calls.all().flatMap(call => call.args.flatMap(arg => arg));
          const shouldRemove = [connectorMock];
          expect(shouldRemove.every(toRemove => removedElements.indexOf(toRemove) > -1)).toBeTruthy();
        }

        if (shouldReconnectGatewayToSuccessor) {
          expect(connectShapeSpy).toHaveBeenCalled();
          expect(connectShapeSpy).toHaveBeenCalledWith(result!.gatewayShape!, configuration.followingTask as IElement);
        }
      });

    });

  });
});


*/