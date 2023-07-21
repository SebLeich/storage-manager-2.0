import { ITaskCreationFormGroupValue } from "@/lib/process-builder/interfaces/task-creation-form-group-value.interface";
import { ITaskCreationPayload } from "@/lib/process-builder/interfaces/task-creation-payload.interface";
import { IC2mProcessor } from "../interfaces/c2m-processor.interface";
import { IElement } from "@/lib/bpmn-io/interfaces/element.interface";
import { BPMNJsRepository } from "@/lib/core/bpmn-js.repository";
import { BpmnJsService } from "@/lib/process-builder/services/bpmn-js.service";
import { Inject, Injectable } from "@angular/core";
import { selectSnapshot } from "@/lib/process-builder/globals/select-snapshot";
import { Store } from "@ngrx/store";
import { selectIFunction, selectIParamsByNormalizedName, selectNextFunctionIdentifier, selectNextParameterIdentifier } from "@/lib/process-builder/store/selectors";
import { IBpmnJS, IFunction, IInputParam, IMethodEvaluationResult, IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from "@/lib/process-builder/interfaces";
import { CodemirrorRepository } from "@/lib/core/codemirror.repository";
import defaultImplementation from "@/lib/process-builder/globals/default-implementation";
import { ProcessBuilderRepository } from "@/lib/core/process-builder-repository";
import { MethodEvaluationStatus } from "@/lib/process-builder/globals/method-evaluation-status";
import { upsertIFunction } from "@/lib/process-builder/store";
import { BPMN_JS } from "@/lib/process-builder/injection-token";
import shapeTypes from "@/lib/bpmn-io/shape-types";
import { ConfirmationComponent } from "@/lib/confirmation/components/confirmation/confirmation.component";
import { IConfirmationInput } from "@/lib/confirmation/interfaces/confirmation-input.interface";
import { MatDialog } from "@angular/material/dialog";

/**
 * that processor applies changes provided by a task creation form group value to the bpmn js model and the state
 * effected entities are:
 * - the activity function
 * - the bpmn activity
 */
@Injectable()
export class ActivityC2MProcessor implements IC2mProcessor {

  constructor(
    @Inject(BPMN_JS) private _bpmnJs: IBpmnJS,
    @Inject(PROCESS_BUILDER_CONFIG_TOKEN) private _config: IProcessBuilderConfig,
    private _bpmnJsService: BpmnJsService,
    private _store: Store,
    private _dialog: MatDialog
  ) { }

  public async processConfiguration({ taskCreationPayload, taskCreationFormGroupValue }: { taskCreationPayload?: ITaskCreationPayload, taskCreationFormGroupValue?: ITaskCreationFormGroupValue }) {
    const configureActivity = taskCreationPayload?.configureActivity;
    if (!configureActivity) {
      return;
    }

    if (!taskCreationFormGroupValue) {
      const activityFunctionId = BPMNJsRepository.getActivityFunctionId(configureActivity);
      if (typeof activityFunctionId !== 'number') {
        this._bpmnJsService.modelingModule.removeElements([configureActivity]);
        return;
      }

      const referencedFunction = await selectSnapshot(this._store.select(selectIFunction(activityFunctionId)));
      if (!referencedFunction) {
        const dialogConfig = {
          data: {
            headline: 'function not existing',
            html: '<p>The function referenced by the activity is not existing. Do you want to remove the activity?</p>',
          } as IConfirmationInput
        };

        const result: boolean = await selectSnapshot(this._dialog.open(ConfirmationComponent, dialogConfig).afterClosed());
        if (result) {
          this._bpmnJsService.modelingModule.removeElements([configureActivity]);
        }
      }

      return;
    }

    const referencedFunction = await selectSnapshot(this._store.select(selectIFunction(taskCreationFormGroupValue.functionIdentifier)));
    if (!referencedFunction) {
      this._bpmnJsService.modelingModule.removeElements([configureActivity]);
      return;
    }

    const nextParamId = await selectSnapshot(this._store.select(selectNextParameterIdentifier()));
    const code = taskCreationFormGroupValue.implementation ? taskCreationFormGroupValue.implementation.text : defaultImplementation;
    const methodEvaluation = CodemirrorRepository.evaluateCustomMethod(undefined, code);
    const updatedFunction = await this._applyFunctionConfiguration(
      taskCreationFormGroupValue,
      referencedFunction,
      methodEvaluation,
      typeof referencedFunction.output === 'number' ? referencedFunction.output : nextParamId
    );

    BPMNJsRepository.setActivityFunctionId(this._bpmnJs, configureActivity, referencedFunction.identifier);

    const effectedActivities = this._bpmnJsService.elementRegistryModule.filter(element => element.type === shapeTypes.Task && BPMNJsRepository.getSLPBExtension(element.businessObject, 'ActivityExtension', (ext => ext.activityFunctionId)) === referencedFunction?.identifier);
    for (const activity of effectedActivities) {
      this._bpmnJsService.modelingModule.updateLabel(activity, referencedFunction.name);
    }

    return { updatedFunction };
  }

  private async _applyFunctionConfiguration(taskCreationData: ITaskCreationFormGroupValue, referencedFunction: IFunction, methodEvaluation: IMethodEvaluationResult, outputParamId: number) {
    const inputParams = await this._extractInputParams(taskCreationData, referencedFunction);
    const functionIdentifier = referencedFunction.requireCustomImplementation ? await selectSnapshot(this._store.select(selectNextFunctionIdentifier())) : referencedFunction.identifier;
    const updatedFunction = {
      customImplementation: taskCreationData.implementation?.text ?? undefined,
      canFail: taskCreationData.canFail ?? false,
      name: taskCreationData.name ?? this._config.defaultFunctionName,
      identifier: functionIdentifier,
      normalizedName: taskCreationData.normalizedName ?? ProcessBuilderRepository.normalizeName(taskCreationData.name ?? undefined),
      output: methodEvaluation.status === MethodEvaluationStatus.ReturnValueFound ? outputParamId : null,
      implementation: referencedFunction.implementation,
      inputTemplates: inputParams,
      requireCustomImplementation: false,
      requireDynamicInput: false,
      finalizesFlow: taskCreationData.isProcessOutput ?? false,
      requireStaticOutputDefinition: referencedFunction.requireStaticOutputDefinition
    } as IFunction;
    this._store.dispatch(upsertIFunction(updatedFunction));

    return updatedFunction;
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
}