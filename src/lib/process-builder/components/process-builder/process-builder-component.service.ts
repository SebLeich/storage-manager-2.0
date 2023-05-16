import { Inject, Injectable } from '@angular/core';
import { BpmnJsService } from '../../services/bpmn-js.service';
import { DialogService } from '../../services/dialog.service';
import { combineLatest, tap, map, of, switchMap, shareReplay, firstValueFrom } from 'rxjs';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js.repository';
import { TaskCreationStep } from '../../globals/task-creation-step';
import { ITaskCreationPayload } from '../../interfaces/task-creation-payload.interface';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from '../../interfaces/process-builder-config.interface';
import { IConnector } from 'src/lib/bpmn-io/interfaces/connector.interface';
import { CodemirrorRepository } from 'src/lib/core/codemirror.repository';
import { selectSnapshot } from '../../globals/select-snapshot';
import { Store } from '@ngrx/store';
import defaultImplementation from '../../globals/default-implementation';
import { IMethodEvaluationResult } from '../../interfaces/method-evaluation-result.interface';
import { MethodEvaluationStatus } from '../../globals/method-evaluation-status';
import { ProcessBuilderRepository } from 'src/lib/core/process-builder-repository';
import { removeIFunction, setIFunctionsCanFailFlag, upsertIFunction, upsertIParam } from '@process-builder/actions';
import shapeTypes from 'src/lib/bpmn-io/shape-types';
import { IElement } from 'src/lib/bpmn-io/interfaces/element.interface';
import { deepObjectLookup } from 'src/lib/shared/globals/deep-object-lookup.function';
import { ConfirmationService } from 'src/lib/confirmation/services/confirmation.service';
import { ITaskCreationFormGroupValue } from '../../interfaces/task-creation-form-group-value.interface';
import { IBpmnJS, IFunction, IInputParam, IParam, IParamDefinition } from '@process-builder/interfaces';
import { BPMN_JS } from '@process-builder/injection';
import { mapIParamsInterfaces } from '../../extensions/rxjs/map-i-params-interfaces.rxjs';
import { mapIParamInterfaces } from '../../extensions/rxjs/map-i-param-interfaces.rxjs';
import { selectIFunction, selectIFunctions, selectIInterface, selectIParam, selectIParams, selectIParamsByNormalizedName, selectNextFunctionIdentifier, selectNextParameterIdentifier } from '@process-builder/selectors';

@Injectable()
export class ProcessBuilderComponentService {

  public taskEditingDialogResultReceived$ = this._bpmnJsService
    .bufferedTaskEditingEvents$
    .pipe(
      switchMap((events) => {
        const functionSelectionConfig = events.find(event => event.taskCreationStep === TaskCreationStep.ConfigureFunctionSelection);
        const functionIdentifier = BPMNJsRepository.getSLPBExtension<number>(functionSelectionConfig?.element?.businessObject, 'ActivityExtension', (ext) => ext.activityFunctionId) ?? null;
        const taskCreationPayload = {
          configureActivity: events.find(event => event.taskCreationStep === TaskCreationStep.ConfigureFunctionSelection)?.element,
          configureIncomingErrorGatewaySequenceFlow: events.find(event => event.taskCreationStep === TaskCreationStep.ConfigureErrorGatewayEntranceConnection)?.element
        } as ITaskCreationPayload, taskCreationFormGroupValue = {
          functionIdentifier: functionIdentifier
        } as ITaskCreationFormGroupValue;

        return combineLatest([
          of(taskCreationPayload),
          this._dialogService.configTaskCreation({
            taskCreationFormGroupValue: taskCreationFormGroupValue,
            taskCreationPayload: taskCreationPayload
          })
        ]).pipe(
          map(([taskCreationPayload, taskCreationFormGroupValue]: [ITaskCreationPayload, ITaskCreationFormGroupValue]) => ({ taskCreationPayload, taskCreationFormGroupValue }))
        );
      })
    );

  public paramEditorDialogResultReceived$ = this._bpmnJsService
    .bufferedDataObjectReferenceEditingEvents$
    .pipe(
      tap(result => console.log(result))
    );

  constructor(
    @Inject(BPMN_JS) private _bpmnJs: IBpmnJS,
    @Inject(PROCESS_BUILDER_CONFIG_TOKEN) private _config: IProcessBuilderConfig,
    private _dialogService: DialogService,
    private _bpmnJsService: BpmnJsService,
    private _store: Store,
    private _confirmationService: ConfirmationService
  ) { }

  public async applyTaskCreationConfig(taskCreationPayload: ITaskCreationPayload, taskCreationData?: ITaskCreationFormGroupValue) {
    if (!taskCreationData) {
      this._removeActivityWhenNoFunctionIsReferenced(taskCreationPayload.configureActivity);
      return;
    }

    let referencedFunction: IFunction | undefined | null, outputParam: IParam | undefined, gatewayShape: IElement | undefined;
    if (taskCreationData) {
      referencedFunction = await selectSnapshot(this._store.select(selectIFunction(taskCreationData.functionIdentifier)));
    }

    const connector = this._bpmnJsService.elementRegistryModule.get(taskCreationPayload.configureIncomingErrorGatewaySequenceFlow?.id ?? '') as IConnector;
    if (connector) {
      if (taskCreationData?.entranceGatewayType) {
        if (taskCreationData.entranceGatewayType) {
          BPMNJsRepository.updateBpmnElementSLPBExtension(this._bpmnJs, connector.businessObject, 'SequenceFlowExtension', (ext) => ext.sequenceFlowType = taskCreationData.entranceGatewayType === 'Success' ? 'success' : 'error');
          this._applyConnectorDefaultLabels(connector, taskCreationData);
        }
      } else {
        this._bpmnJsService.modelingModule.removeElements([connector]);
      }
    }

    if (!referencedFunction && taskCreationPayload.configureActivity) {
      this._handleNoFunctionSelected(taskCreationPayload);
    }

    if (!referencedFunction) {
      return;
    }

    const nextParamId = await selectSnapshot(this._store.select(selectNextParameterIdentifier()));
    const code = taskCreationData.implementation ? taskCreationData.implementation.text : defaultImplementation;
    const methodEvaluation = CodemirrorRepository.evaluateCustomMethod(undefined, code);

    if (referencedFunction.requireCustomImplementation || referencedFunction.customImplementation || taskCreationData.implementation) {
      referencedFunction = await this._applyFunctionConfiguration(taskCreationData, referencedFunction, methodEvaluation, typeof referencedFunction.output === 'number' ? referencedFunction.output : nextParamId) as IFunction;
    }

    const resultingEndEvent = taskCreationPayload.configureActivity?.outgoing?.find(outgoing => outgoing.target.type === 'bpmn:EndEvent')?.target;
    if (referencedFunction.finalizesFlow && !resultingEndEvent) {
      this._appendSequenceFlowEndEvent(taskCreationPayload);
    } else if (!referencedFunction?.finalizesFlow && resultingEndEvent) {
      this._bpmnJsService.modelingModule.removeElements([resultingEndEvent, ...resultingEndEvent.incoming]);
    }

    if (taskCreationPayload.configureActivity) {
      this._updateBpmnModelElementActivityIdentifier(taskCreationPayload, referencedFunction);

      if (typeof referencedFunction.output === 'number') {
        outputParam = (await selectSnapshot(this._store.select(selectIParam(referencedFunction.output)))) ?? { identifier: nextParamId } as IParam;
        const outputParamResult = await this._handleFunctionOutputParam(taskCreationData, taskCreationPayload, outputParam, methodEvaluation);
        outputParam = outputParamResult?.outputParam ?? outputParam;
      } else if (typeof referencedFunction.outputTemplate === 'string') {
        const iFace = await selectSnapshot(this._store.select(selectIInterface(referencedFunction.outputTemplate)));
        outputParam = { identifier: nextParamId, interface: iFace?.identifier, name: iFace?.name, normalizedName: iFace?.normalizedName } as IParam;
        const outputParamResult = await this._handleFunctionOutputParam(taskCreationData, taskCreationPayload, outputParam, methodEvaluation);
        outputParam = outputParamResult?.outputParam ?? outputParam;
      }

      gatewayShape = this._handleErrorGatewayConfiguration(taskCreationPayload, referencedFunction)?.gatewayShape;

      this._handleDataInputConfiguration(taskCreationData, taskCreationPayload, referencedFunction);
    }

    const effectedActivities = this._bpmnJsService.elementRegistryModule.filter(element => element.type === shapeTypes.Task && BPMNJsRepository.getSLPBExtension(element.businessObject, 'ActivityExtension', (ext => ext.activityFunctionId)) === referencedFunction?.identifier);
    for(const activity of effectedActivities){
      this._bpmnJsService.modelingModule.updateLabel(activity, referencedFunction.name);
    }

    return { gatewayShape, outputParam };
  }

  public async tryDeleteErrorGateway(element: IElement) {
    const comingFromActivities = element
      .incoming
      .filter(incoming => incoming.type === shapeTypes.SequenceFlow && incoming.source.type === shapeTypes.Task)
      .map(incoming => incoming.source);

    const referencedFunctionIdentifiers = comingFromActivities.map(activity => BPMNJsRepository.getSLPBExtension(activity.businessObject, 'ActivityExtension', (ext) => ext.activityFunctionId));
    const referencedFunctions = await selectSnapshot(this._store.select(selectIFunctions(referencedFunctionIdentifiers)));

    const result = await this._confirmationService.requestConfirmation(
      `${referencedFunctions.length === 1 ? 'One method' : referencedFunctions.length + ' methods'} will be changed`,
      `By deleting that gateway, you will remove the 'canFail'-flag from the methods listed below.<ul>${referencedFunctions.map(func => '<li>' + func.normalizedName + '</li>')}</ul><b>Do you want to proceed?</b>`
    );

    if (result) {
      const action = setIFunctionsCanFailFlag({ funcs: referencedFunctionIdentifiers, canFail: false });
      this._store.dispatch(action);
      this._bpmnJsService.modelingModule.removeElements([element]);
      this._bpmnJsService.saveCurrentBpmnModel();
    }
  }

  public async tryDeleteFunction(element: IElement) {
    const referencedFunctionIdentifier = BPMNJsRepository.getSLPBExtension(element.businessObject, 'ActivityExtension', (ext) => ext.activityFunctionId);
    const func = await selectSnapshot(this._store.select(selectIFunction(referencedFunctionIdentifier)));

    const result = func?.customImplementation ? await this._confirmationService.requestConfirmation(
      `${func.normalizedName} will be deleted`,
      `By deleting that activity, you will remove the method '${func.normalizedName}', all resulting parameters and all following gateways. That may break your pipeline!</br><b>Do you want to proceed?</b>`
    ) : true;

    if (result) {
      this._bpmnJsService.removeOutgoingDataObjectReferences(element);
      this._bpmnJsService.removeOutgoingGateways(element);
      this._bpmnJsService.modelingModule.removeElements([element]);
      if (func?.customImplementation) this._store.dispatch(removeIFunction(func));
      this._bpmnJsService.saveCurrentBpmnModel();
    }
  }

  private _handleDataInputConfiguration(taskCreationData: ITaskCreationFormGroupValue, taskCreationPayload: ITaskCreationPayload, resultingFunction: IFunction) {
    const configureActivity = taskCreationPayload.configureActivity;
    if (configureActivity) {
      const dataInputAssociations = configureActivity.incoming.filter(incoming => incoming.type === shapeTypes.DataInputAssociation);
      if (dataInputAssociations.length > 0) {
        this._bpmnJsService.modelingModule.removeElements(dataInputAssociations);
      }
    }

    if (resultingFunction.inputTemplates || resultingFunction.inputTemplates === 'dynamic') {
      const inputParams = Array.isArray(resultingFunction.inputTemplates) ? [...resultingFunction.inputTemplates] : [];
      if (typeof taskCreationData.inputParam === 'number') {
        inputParams.push({ optional: false, interface: taskCreationData.interface ?? undefined, name: 'my input', type: 'string' });
      }

      if (configureActivity) {
        const availableInputParamsIElements = BPMNJsRepository.getAvailableInputParamsIElements(configureActivity);
        for (const param of inputParams.filter(inputParam => !(taskCreationPayload.configureActivity as IElement).incoming.some(y => BPMNJsRepository.sLPBExtensionSetted(y.source.businessObject, 'DataObjectExtension', (ext) => ext.outputParam === inputParam)))) {
          // HEREEE
          const element = availableInputParamsIElements.find(x => BPMNJsRepository.sLPBExtensionSetted(x.businessObject, 'DataObjectExtension', (ext) => ext.outputParam === param as IInputParam));
          if (element) {
            this._bpmnJsService.modelingModule.connect(element, configureActivity);
          }
        }
      }
    }
  }

  private _handleErrorGatewayConfiguration(taskCreationPayload: ITaskCreationPayload, resultingFunction: IFunction) {
    if (!taskCreationPayload.configureActivity) {
      return;
    }

    const outgoingErrorGatewaySequenceFlow = taskCreationPayload
      .configureActivity
      .outgoing
      .find(sequenceFlow => sequenceFlow.type === shapeTypes.SequenceFlow && sequenceFlow.target?.type === shapeTypes.ExclusiveGateway);

    let gatewayShape = outgoingErrorGatewaySequenceFlow?.target;

    if (resultingFunction.canFail && !gatewayShape) {
      const outgoingSequenceFlows = taskCreationPayload.configureActivity.outgoing.filter(outgoing => outgoing.type === shapeTypes.SequenceFlow);
      const formerConnectedTargets = outgoingSequenceFlows.map(outgoingSequenceFlow => outgoingSequenceFlow.target);
      this._bpmnJsService.modelingModule.removeElements(formerConnectedTargets);

      gatewayShape = this._bpmnJsService.modelingModule.appendShape(
        taskCreationPayload.configureActivity,
        { type: shapeTypes.ExclusiveGateway },
        {
          x: taskCreationPayload.configureActivity.x + 200,
          y: taskCreationPayload.configureActivity.y + 40
        }
      );

      this._bpmnJsService.modelingModule.updateLabel(gatewayShape, this._config.errorGatewayConfig.gatewayName);

      // reconnect the former connected target as success action
      if (formerConnectedTargets[0]) {
        const connector = this._bpmnJsService.modelingModule.connect(gatewayShape, formerConnectedTargets[0]);
        BPMNJsRepository.updateBpmnElementSLPBExtension(this._bpmnJs, connector.businessObject, 'SequenceFlowExtension', (ext) => ext.sequenceFlowType = 'success');
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

  private _applyConnectorDefaultLabels(connector: IConnector, taskCreationData: ITaskCreationFormGroupValue) {
    const connectorLabel = taskCreationData.entranceGatewayType === 'Success'
      ? this._config.errorGatewayConfig.successConnectionName
      : this._config.errorGatewayConfig.errorConnectionName;

    this._bpmnJsService.modelingModule.updateLabel(connector, connectorLabel)
  }

  private _removeActivityWhenNoFunctionIsReferenced(configureActivity: IElement | undefined) {
    if (!configureActivity) {
      return;
    }
    const activityFunctionId = BPMNJsRepository.getSLPBExtension(configureActivity?.businessObject, 'ActivityExtension', (ext) => ext.activityFunctionId);
    if (!activityFunctionId) {
      this._bpmnJsService.modelingModule.removeElements([configureActivity]);
    }
  }

  private async _applyFunctionConfiguration(taskCreationData: ITaskCreationFormGroupValue, referencedFunction: IFunction, methodEvaluation: IMethodEvaluationResult, outputParamId: number) {
    const inputParams = await this._extractInputParams(taskCreationData, referencedFunction);
    const functionIdentifier = referencedFunction.requireCustomImplementation ? await selectSnapshot(this._store.select(selectNextFunctionIdentifier())) : referencedFunction.identifier;
    const resultingFunction = {
      customImplementation: taskCreationData.implementation?.text ?? undefined,
      canFail: taskCreationData.canFail ?? false,
      name: taskCreationData.name ?? this._config.defaultFunctionName,
      identifier: functionIdentifier,
      normalizedName: taskCreationData.normalizedName ?? ProcessBuilderRepository.normalizeName(taskCreationData.name ?? undefined),
      output: methodEvaluation.status === MethodEvaluationStatus.ReturnValueFound || referencedFunction.outputTemplate === 'dynamic' ? outputParamId : null,
      implementation: referencedFunction.implementation,
      inputTemplates: inputParams,
      requireCustomImplementation: false,
      requireDynamicInput: false,
      finalizesFlow: taskCreationData.isProcessOutput ?? false
    } as IFunction;
    this._store.dispatch(upsertIFunction(resultingFunction));
    return resultingFunction;
  }

  private async _appendSequenceFlowEndEvent(taskCreationPayload: ITaskCreationPayload) {
    if (!taskCreationPayload.configureActivity) {
      return;
    }
    this._bpmnJsService.modelingModule.appendShape(taskCreationPayload.configureActivity, { type: shapeTypes.EndEvent }, {
      x: taskCreationPayload.configureActivity.x + 200,
      y: taskCreationPayload.configureActivity.y + 40
    });
  }

  private async _extractInputParams(taskCreationData: ITaskCreationFormGroupValue, referencedFunction: IFunction): Promise<IInputParam[]> {
    const inputParams: IInputParam[] = [];
    if (referencedFunction.inputTemplates === 'dynamic' && typeof taskCreationData.interface === 'string') {
      inputParams.push({ optional: false, interface: taskCreationData.interface, name: taskCreationData.normalizedName, type: 'object' });
    }
    else if (referencedFunction.requireCustomImplementation || referencedFunction.customImplementation) {
      const usedInputParams: { varName: string, propertyName: string | null }[] = taskCreationData.implementation
        ? CodemirrorRepository.getUsedInputParams(undefined, taskCreationData.implementation.text)
        : [];

      const usedInputParamEntities = await selectSnapshot(
        this._store.select(
          selectIParamsByNormalizedName(
            usedInputParams.filter(
              usedInputParam => usedInputParam.varName === 'injector'
                && typeof usedInputParam.propertyName === 'string'
            ).map(usedInputParam => usedInputParam.propertyName) as string[]
          )
        )
      );

      inputParams.push(...usedInputParamEntities.map((usedInputParamEntity) => {
        return {
          optional: false,
          interface: typeof usedInputParamEntity.interface === 'number' ? usedInputParamEntity.interface : undefined,
          name: usedInputParamEntity.normalizedName,
          type: 'object'
        } as IInputParam
      }));
    }
    return inputParams;
  }

  private async _handleFunctionOutputParam(taskCreationData: ITaskCreationFormGroupValue, taskCreationPayload: ITaskCreationPayload, outputParam: IParam, methodEvaluation?: IMethodEvaluationResult) {
    if (!taskCreationPayload.configureActivity) {
      return;
    }

    if (!methodEvaluation) {
      const code = taskCreationData.implementation ? taskCreationData.implementation.text : defaultImplementation;
      methodEvaluation = CodemirrorRepository.evaluateCustomMethod(undefined, code);
    }

    if (methodEvaluation.status === MethodEvaluationStatus.ReturnValueFound || outputParam) {
      const paramInterface = outputParam.interface ?? taskCreationData.interface ?? await this._outputParamInterface(methodEvaluation);
      outputParam = {
        ...outputParam,
        name: taskCreationData.outputParamName ?? outputParam.name ?? this._config.dynamicParamDefaultNaming,
        normalizedName: taskCreationData.normalizedOutputParamName ?? outputParam.normalizedName ?? ProcessBuilderRepository.normalizeName(taskCreationData.outputParamName ?? this._config.dynamicParamDefaultNaming),
        defaultValue: outputParam.defaultValue ?? await this._outputParamValue(methodEvaluation, taskCreationData.outputParamValue),
        interface: paramInterface
      } as IParam;
      if (typeof outputParam.interface === 'string') {
        outputParam.type = 'object';
      } else {
        const outputType = await this._methodEvaluationTypeToOutputType(taskCreationPayload.configureActivity, methodEvaluation);
        outputParam.type = outputType;
      }
      
      this._store.dispatch(upsertIParam(outputParam));

      BPMNJsRepository.appendOutputParam(
        this._bpmnJs,
        taskCreationPayload.configureActivity,
        outputParam,
        true,
        this._config.expectInterface
      );

      return { outputParam }
    } else {
      const dataOutputAssociations = taskCreationPayload.configureActivity.outgoing.filter(x => x.type === shapeTypes.DataOutputAssociation);
      this._bpmnJsService.modelingModule.removeElements(dataOutputAssociations.map(dataOutputAssociation => dataOutputAssociation.target));
    }
  }

  private async _methodEvaluationTypeToOutputType(element: IElement, methodEvaluation?: IMethodEvaluationResult) {
    if (methodEvaluation?.injectorNavigationPath) {
      const inputParams = await firstValueFrom(this._store.select(selectIParams(BPMNJsRepository.getAvailableInputParams(element))).pipe(
        shareReplay(1),
        map(inputParams => inputParams ?? []),
        mapIParamsInterfaces(this._store)
      ));
      const currentPath = methodEvaluation.injectorNavigationPath.split('.');
      let currentIndex = 1;
      let param: IParam | IParamDefinition | undefined = inputParams.find(param => param.normalizedName === currentPath[0]);
      while(currentIndex < currentPath.length && param && Array.isArray(param.typeDef)){
        param = param.typeDef.find(param => param.name === currentPath[currentIndex]);
        currentIndex++;
      }

      if(param){
        return param.type;
      }

      throw('error');
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

  private async _outputParamInterface(methodEvaluation: IMethodEvaluationResult) {
    if (methodEvaluation.injectorNavigationPath) {
      const pathArray = methodEvaluation.injectorNavigationPath?.split('.');
      const inputParam = await firstValueFrom(this._store.select(selectIParams()).pipe(
        map(inputParams => {
          const root = pathArray[0];
          return (inputParams ?? []).find(inputParam => inputParam.normalizedName === root);
        }),
        mapIParamInterfaces(this._store)
      ));

      if(!inputParam) return;

      let currentIndex = 1;
      let currentMember = /^(.*).{0,1}\[(.*)\]/.exec(pathArray[currentIndex]);
      let currentMemberName = currentMember?.[1] ?? null;
      let currentTypeDef = (inputParam.typeDef as IParamDefinition[]).find(definition => definition.name === currentMemberName);

      while((currentIndex + 1) < pathArray.length ?? 0){
        if(/^.+\(.*\)$/.test(pathArray[currentIndex])){
          break;
        } else if(currentTypeDef?.type === 'array'){
          if(typeof currentMember?.[2] === 'number'){
            // array index
          } else {
            // array method/member call
            const call = /^([a-zA-Z0-9]*).{0,1}\((.*)\)/.exec(pathArray.slice(currentIndex).join('.'));
            const array: any = ProcessBuilderRepository.createPseudoObjectFromIParam(currentTypeDef);
            const result = call![2]? `${array[call![1]]}(${call![2]})`: array[call![1]];
            debugger;
          }
        } else {
          currentIndex++;
          currentMember = /^(.*).{0,1}\[(.*)\]/.exec(pathArray[currentIndex]);
          currentMemberName = currentMember?.[1] ?? null;
          currentTypeDef = (inputParam.typeDef as IParamDefinition[]).find(definition => definition.name === currentMemberName);
        }
      }

      return currentTypeDef?.interface;
    }
  }

  private async _outputParamValue(methodEvaluation: IMethodEvaluationResult, defaultValue: object | null = null) {
    if (methodEvaluation.injectorNavigationPath) {
      const inputParam = await firstValueFrom(this._store.select(selectIParams()).pipe(
        map(inputParams => {
          const root = methodEvaluation.injectorNavigationPath?.split('.')[0];
          return (inputParams ?? []).find(inputParam => inputParam.normalizedName === root);
        }),
        mapIParamInterfaces(this._store)
      ));
      const object = ProcessBuilderRepository.createPseudoObjectFromIParam(inputParam);
      const injectedValue = deepObjectLookup(object, methodEvaluation.injectorNavigationPath);
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
    if (!taskCreationPayload.configureActivity) {
      return;
    }

    BPMNJsRepository.updateBpmnElementSLPBExtension(
      this._bpmnJs,
      taskCreationPayload.configureActivity.businessObject,
      'ActivityExtension',
      (e) => e.activityFunctionId = referencedFunction.identifier
    );
  }

}
