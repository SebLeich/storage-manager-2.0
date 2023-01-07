import { Inject, Injectable } from '@angular/core';
import { BpmnJsService } from '../../services/bpmn-js.service';
import { DialogService } from '../../services/dialog.service';
import { combineLatest, map, of, switchMap } from 'rxjs';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js.repository';
import { TaskCreationStep } from '../../globals/task-creation-step';
import { ITaskCreationPayload } from '../../interfaces/i-task-creation-payload.interface';
import { ITaskCreationData } from '../../interfaces/i-task-creation-data.interface';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from '../../globals/i-process-builder-config';
import { IConnector } from 'src/lib/bpmn-io/interfaces/connector.interface';
import { CodemirrorRepository } from 'src/lib/core/codemirror.repository';
import { selectSnapshot } from '../../globals/select-snapshot';
import { Store } from '@ngrx/store';
import * as paramSelectors from '../../store/selectors/param.selectors';
import * as functionSelectors from '../../store/selectors/function.selector';
import defaultImplementation from '../../globals/default-implementation';
import { IMethodEvaluationResult } from '../../interfaces/i-method-evaluation-result.interface';
import { MethodEvaluationStatus } from '../../globals/method-evaluation-status';
import { IFunction } from '../../globals/i-function';
import { IParam } from '../../globals/i-param';
import { ProcessBuilderRepository } from 'src/lib/core/process-builder-repository';
import { upsertIParam } from '../../store/actions/param.actions';
import shapeTypes from 'src/lib/bpmn-io/shape-types';
import { upsertIFunction } from '../../store/actions/function.actions';
import { IElement } from 'src/lib/bpmn-io/interfaces/element.interface';
import { deepObjectLookup } from 'src/lib/shared/globals/deep-object-lookup.function';
import { injectInterfaces, injectValues } from '../../store/selectors/injection-context.selectors';

@Injectable()
export class ProcessBuilderComponentService {

  public taskEditingDialogResultReceived$ = this._bpmnJsService
    .bufferedTaskEditingEvents$
    .pipe(
      switchMap((events) => {
        const functionSelectionConfig = events.find(event => event.taskCreationStep === TaskCreationStep.ConfigureFunctionSelection);
        const functionIdentifier = BPMNJsRepository.getSLPBExtension<number>(functionSelectionConfig?.element?.businessObject, 'ActivityExtension', (ext) => ext.activityFunctionId) ?? null;
        const
          taskCreationPayload = {
            configureActivity: events.find(event => event.taskCreationStep === TaskCreationStep.ConfigureFunctionSelection)?.element,
            configureIncomingErrorGatewaySequenceFlow: events.find(event => event.taskCreationStep === TaskCreationStep.ConfigureErrorGatewayEntranceConnection)?.element
          } as ITaskCreationPayload,
          taskCreationData = {
            functionIdentifier: functionIdentifier
          } as ITaskCreationData;

        return combineLatest([
          of(taskCreationPayload),
          this._dialogService.configTaskCreation(
            {
              taskCreationData: taskCreationData,
              taskCreationPayload: taskCreationPayload
            }
          )
        ]).pipe(
          map(([taskCreationPayload, taskCreationData]: [ITaskCreationPayload, ITaskCreationData]) => ({ taskCreationPayload, taskCreationData }))
        );
      })
    );

  constructor(
    @Inject(PROCESS_BUILDER_CONFIG_TOKEN) private _config: IProcessBuilderConfig,
    private _dialogService: DialogService,
    private _bpmnJsService: BpmnJsService,
    private _store: Store,
  ) { }

  public async applyTaskCreationConfig(taskCreationPayload: ITaskCreationPayload, taskCreationData?: ITaskCreationData) {
    let referencedFunction: IFunction | undefined | null, outputParam: IParam | undefined, gatewayShape: IElement | undefined;
    if (taskCreationData) {
      referencedFunction = await selectSnapshot(this._store.select(functionSelectors.selectIFunction(taskCreationData.functionIdentifier)));
    }

    if (!referencedFunction) {
      this._handleNoFunctionSelected(taskCreationPayload);
    }

    if (!referencedFunction || !taskCreationData) {
      return;
    }

    if (taskCreationData.entranceGatewayType) {
      const connector = taskCreationPayload.configureIncomingErrorGatewaySequenceFlow;
      if (!!connector) {
        this._applyConnectorDefaultLabels(connector, taskCreationData);
      }
    }

    let resultingFunction = referencedFunction;
    const nextParamId = await selectSnapshot(this._store.select(paramSelectors.selectNextId()));
    const methodEvaluation = CodemirrorRepository.evaluateCustomMethod(undefined, taskCreationData.implementation ?? defaultImplementation);
    const outputParamId = typeof referencedFunction.output?.param === 'number' ? referencedFunction.output?.param : nextParamId;

    if (referencedFunction.requireCustomImplementation || referencedFunction.customImplementation || taskCreationData.implementation) {
      referencedFunction = await this._applyFunctionConfiguration(taskCreationData, referencedFunction, methodEvaluation, outputParamId) as IFunction;
    }

    const resultingEndEvent = taskCreationPayload.configureActivity?.outgoing?.find(outgoing => outgoing.target.type === 'bpmn:EndEvent')?.target;
    if (referencedFunction.finalizesFlow && !resultingEndEvent) {
      this._appendSequenceFlowEndEvent(taskCreationPayload);
    } else if (!referencedFunction?.finalizesFlow && resultingEndEvent) {
      this._bpmnJsService.modelingModule.removeElements([resultingEndEvent, ...resultingEndEvent.incoming]);
    }

    if (taskCreationPayload.configureActivity) {
      this._updateBpmnModelElementActivityIdentifier(taskCreationPayload, referencedFunction);
      this._bpmnJsService.modelingModule.updateLabel(taskCreationPayload.configureActivity, referencedFunction.name);

      outputParam = await selectSnapshot(this._store.select(paramSelectors.selectIParam(outputParamId))) ?? { identifier: outputParamId } as IParam;
      outputParam = (await this._handleFunctionOutputParam(taskCreationData, taskCreationPayload, outputParam, methodEvaluation))?.outputParam;

      gatewayShape = this._handleErrorGatewayConfiguration(taskCreationPayload, referencedFunction)?.gatewayShape;

      this._handleDataInputConfiguration(taskCreationData, taskCreationPayload, resultingFunction, referencedFunction);
    }

    return { gatewayShape, outputParam };
  }

  private _handleDataInputConfiguration(taskCreationData: ITaskCreationData, taskCreationPayload: ITaskCreationPayload, resultingFunction: IFunction, referencedFunction: IFunction) {
    const configureActivity = taskCreationPayload.configureActivity;
    if (configureActivity) {
      const dataInputAssociations = configureActivity.incoming.filter(incoming => incoming.type === shapeTypes.DataInputAssociation);
      if (dataInputAssociations) {
        this._bpmnJsService.modelingModule.removeElements(dataInputAssociations);
      }
    }

    if (resultingFunction.inputParams || referencedFunction.useDynamicInputParams) {
      const inputParams = resultingFunction.inputParams ? Array.isArray(resultingFunction.inputParams) ? [...resultingFunction.inputParams] : [resultingFunction.inputParams] : [];
      if (typeof taskCreationData.inputParam === 'number') {
        inputParams.push({ optional: false, param: taskCreationData.inputParam });
      }

      if (configureActivity) {
        const availableInputParamsIElements = BPMNJsRepository.getAvailableInputParamsIElements(configureActivity);
        for (let param of inputParams.filter(inputParam => !(taskCreationPayload.configureActivity as IElement).incoming.some(y => BPMNJsRepository.sLPBExtensionSetted(y.source.businessObject, 'DataObjectExtension', (ext) => ext.outputParam === inputParam.param)))) {
          const element = availableInputParamsIElements.find(x => BPMNJsRepository.sLPBExtensionSetted(x.businessObject, 'DataObjectExtension', (ext) => ext.outputParam === param.param));
          if (!!element) {
            this._bpmnJsService.modelingModule.connect(element, configureActivity);
          }
        }
      }
    }
  }

  private _handleErrorGatewayConfiguration(taskCreationPayload: ITaskCreationPayload, resultingFunction: IFunction) {
    let outgoingErrorGatewaySequenceFlow = taskCreationPayload
      .configureActivity!
      .outgoing
      .find(outgoing => outgoing.type === shapeTypes.SequenceFlow
        && BPMNJsRepository.sLPBExtensionSetted(
          outgoing.target?.businessObject,
          'GatewayExtension',
          (ext) => ext.gatewayType === 'error_gateway'
        )
      );
    let gatewayShape = outgoingErrorGatewaySequenceFlow?.target;

    if (resultingFunction.canFail && !gatewayShape) {
      const outgoingSequenceFlows = taskCreationPayload.configureActivity!.outgoing.filter(outgoing => outgoing.type === shapeTypes.SequenceFlow);
      const formerConnectedTargets = outgoingSequenceFlows.map(outgoingSequenceFlow => outgoingSequenceFlow.target);
      this._bpmnJsService.modelingModule.removeElements(formerConnectedTargets);

      gatewayShape = this._bpmnJsService.modelingModule.appendShape(
        taskCreationPayload.configureActivity!,
        { type: shapeTypes.ExclusiveGateway },
        {
          x: taskCreationPayload.configureActivity!.x + 200,
          y: taskCreationPayload.configureActivity!.y + 40
        }
      );

      BPMNJsRepository.updateBpmnElementSLPBExtension(this._bpmnJsService.bpmnJs, gatewayShape!.businessObject, 'GatewayExtension', (e: any) => e.gatewayType = 'error_gateway');
      this._bpmnJsService.modelingModule.updateLabel(gatewayShape, this._config.errorGatewayConfig.gatewayName);

      // reconnect the former connected targets
      for (let formerConnectedTarget of formerConnectedTargets) {
        this._bpmnJsService.modelingModule.connect(gatewayShape, formerConnectedTarget);
      }
    } else if (!resultingFunction.canFail && gatewayShape) {
      this._bpmnJsService.modelingModule.removeElements([gatewayShape, ...gatewayShape.incoming, ...gatewayShape.outgoing]);
    }

    return { gatewayShape };
  }

  private _handleNoFunctionSelected(taskCreationPayload: ITaskCreationPayload) {
    const elements = [taskCreationPayload.configureActivity].filter(element => !!element) as (IElement | IConnector)[];
    this._bpmnJsService.modelingModule.removeElements(elements);
  }

  private _applyConnectorDefaultLabels(connector: IConnector, taskCreationData: ITaskCreationData) {
    const connectorLabel = taskCreationData.entranceGatewayType === 'Success'
      ? this._config.errorGatewayConfig.successConnectionName
      : this._config.errorGatewayConfig.errorConnectionName;

    this._bpmnJsService.modelingModule.updateLabel(connector, connectorLabel);
  }

  private async _applyFunctionConfiguration(taskCreationData: ITaskCreationData, referencedFunction: IFunction, methodEvaluation: IMethodEvaluationResult, outputParamId: number) {
    const inputParams = await this._extractInputParams(taskCreationData, referencedFunction);
    const functionIdentifier = referencedFunction.requireCustomImplementation ? await selectSnapshot(this._store.select(functionSelectors.selectNextId())) : referencedFunction.identifier;
    const resultingFunction = {
      customImplementation: taskCreationData.implementation ?? undefined,
      canFail: taskCreationData.canFail ?? false,
      name: taskCreationData.name ?? this._config.defaultFunctionName,
      identifier: functionIdentifier,
      normalizedName: taskCreationData.normalizedName ?? ProcessBuilderRepository.normalizeName(taskCreationData.name ?? undefined),
      output: methodEvaluation.status === MethodEvaluationStatus.ReturnValueFound || referencedFunction.output?.param === 'dynamic' ? { param: outputParamId } : null,
      pseudoImplementation: referencedFunction.pseudoImplementation,
      inputParams: inputParams,
      requireCustomImplementation: false,
      requireDynamicInput: false,
      useDynamicInputParams: referencedFunction.useDynamicInputParams,
      finalizesFlow: taskCreationData.isProcessOutput ?? false
    } as IFunction;
    this._store.dispatch(upsertIFunction(resultingFunction));
    return resultingFunction;
  }

  private async _appendSequenceFlowEndEvent(taskCreationPayload: ITaskCreationPayload) {
    this._bpmnJsService.modelingModule.appendShape(taskCreationPayload.configureActivity!, { type: shapeTypes.EndEvent }, {
      x: taskCreationPayload.configureActivity!.x + 200,
      y: taskCreationPayload.configureActivity!.y + 40
    });
  }

  private async _extractInputParams(taskCreationData: ITaskCreationData, referencedFunction: IFunction) {
    let inputParams: { optional: boolean, param: number }[] = [];
    if (referencedFunction.useDynamicInputParams && typeof taskCreationData.inputParam === 'number') {
      inputParams.push({ optional: false, param: taskCreationData.inputParam });
    }
    else if (referencedFunction.requireCustomImplementation || referencedFunction.customImplementation) {
      const usedInputParams: { varName: string, propertyName: string | null }[] = taskCreationData.implementation
        ? CodemirrorRepository.getUsedInputParams(undefined, taskCreationData.implementation)
        : [];

      const usedInputParamEntities = await selectSnapshot(
        this._store.select(
          paramSelectors.selectIParamsByNormalizedName(
            usedInputParams.filter(
              usedInputParam => usedInputParam.varName === 'injector'
                && typeof usedInputParam.propertyName === 'string'
            ).map(usedInputParam => usedInputParam.propertyName!)
          )
        )
      );

      inputParams.push(...usedInputParamEntities.map(usedInputParamEntity => {
        return { optional: false, param: usedInputParamEntity.identifier }
      }));
    }
    return inputParams;
  }

  private async _handleFunctionOutputParam(taskCreationData: ITaskCreationData, taskCreationPayload: ITaskCreationPayload, outputParam: IParam, methodEvaluation?: IMethodEvaluationResult) {
    if (!methodEvaluation) {
      methodEvaluation = CodemirrorRepository.evaluateCustomMethod(undefined, taskCreationData.implementation ?? defaultImplementation);
    }
    if (methodEvaluation.status === MethodEvaluationStatus.ReturnValueFound || outputParam) {
      outputParam = {
        ...outputParam,
        name: taskCreationData.outputParamName ?? this._config.dynamicParamDefaultNaming,
        normalizedName: taskCreationData.normalizedOutputParamName ?? ProcessBuilderRepository.normalizeName(taskCreationData.outputParamName ?? this._config.dynamicParamDefaultNaming),
        defaultValue: await this._outputParamValue(methodEvaluation, taskCreationData.outputParamValue),
      } as IParam;
      if (typeof taskCreationData.interface === 'number') {
        outputParam.interface = taskCreationData.interface;
        outputParam.type = 'object';
      } else {
        const outputType = await this._methodEvaluationTypeToOutputType(methodEvaluation);
        outputParam.type = outputType;
      }
      this._store.dispatch(upsertIParam(outputParam));

      BPMNJsRepository.appendOutputParam(
        this._bpmnJsService.bpmnJs,
        taskCreationPayload.configureActivity!,
        outputParam,
        true,
        this._config.expectInterface
      );

      return { outputParam }
    } else {
      const dataOutputAssociations = taskCreationPayload.configureActivity!.outgoing.filter(x => x.type === shapeTypes.DataOutputAssociation);
      this._bpmnJsService.modelingModule.removeElements(dataOutputAssociations.map(dataOutputAssociation => dataOutputAssociation.target));
    }
  }

  private async _methodEvaluationTypeToOutputType(methodEvaluation?: IMethodEvaluationResult) {
    if (methodEvaluation?.injectorNavigationPath) {
      const injectorInterfaces = await selectSnapshot(this._store.select(injectInterfaces()));
      const injectedDef = deepObjectLookup(injectorInterfaces, methodEvaluation.injectorNavigationPath);
      return injectedDef.type ?? 'object';
    }
    switch (methodEvaluation?.type) {
      case 'number':
        return 'number';

      case 'string':
        return 'string';

      case 'boolean':
        return 'boolean';

      case 'array':
        return 'array';
    }

    return 'object';
  }

  private async _outputParamValue(methodEvaluation: IMethodEvaluationResult, defaultValue: any = null) {
    if (methodEvaluation.injectorNavigationPath) {
      const injector = await selectSnapshot(this._store.select(injectValues));
      const injectedValue = deepObjectLookup(injector, methodEvaluation.injectorNavigationPath);
      return injectedValue;
    }
    switch (methodEvaluation.type) {
      case 'number':
      case 'string':
      case 'object':
      case 'boolean':
      case 'array':
        return methodEvaluation.detectedValue;
    }

    return defaultValue;
  }

  private _updateBpmnModelElementActivityIdentifier(taskCreationPayload: ITaskCreationPayload, referencedFunction: IFunction) {
    BPMNJsRepository.updateBpmnElementSLPBExtension(
      this._bpmnJsService.bpmnJs,
      taskCreationPayload!.configureActivity!.businessObject,
      'ActivityExtension',
      (e: any) => e.activityFunctionId = referencedFunction!.identifier
    );
  }

}
