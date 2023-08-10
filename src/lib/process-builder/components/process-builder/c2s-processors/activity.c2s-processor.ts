import { ITaskCreationFormGroupValue } from "@/lib/process-builder/interfaces/task-creation-form-group-value.interface";
import { ITaskCreationPayload } from "@/lib/process-builder/interfaces/task-creation-payload.interface";
import { Inject, Injectable } from "@angular/core";
import { selectSnapshot } from "@/lib/process-builder/globals/select-snapshot";
import { Store } from "@ngrx/store";
import { selectIFunction, selectIParamsByNormalizedName, selectNextFunctionIdentifier } from "@/lib/process-builder/store/selectors";
import { IFunction, IInputParam, IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from "@/lib/process-builder/interfaces";
import { CodemirrorRepository } from "@/lib/core/codemirror.repository";
import { ProcessBuilderRepository } from "@/lib/core/process-builder-repository";
import { upsertIFunction } from "@/lib/process-builder/store";
import { IC2SProcessor } from "../interfaces/c2s-processor.interface";

/**
 * that processor applies changes provided by a task creation form group value to the state
 */
@Injectable()
export class ActivityC2SProcessor implements IC2SProcessor {

  constructor(
    @Inject(PROCESS_BUILDER_CONFIG_TOKEN) private _config: IProcessBuilderConfig,
    private _store: Store,
  ) { }

  public async processConfiguration({ taskCreationPayload, taskCreationFormGroupValue }: { taskCreationPayload?: ITaskCreationPayload, taskCreationFormGroupValue?: ITaskCreationFormGroupValue }) {
    const configureActivity = taskCreationPayload?.configureActivity;
    if (!configureActivity || !taskCreationFormGroupValue) {
      return;
    }

    let functionObject = await selectSnapshot(this._store.select(selectIFunction(taskCreationFormGroupValue.functionIdentifier)));
    if (!functionObject) {
      functionObject = {
        identifier: taskCreationFormGroupValue.functionIdentifier,
        _isImplementation: true,
        canFail: taskCreationFormGroupValue.canFail ?? false,
        name: taskCreationFormGroupValue.name ?? this._config.defaultFunctionName,
        normalizedName: taskCreationFormGroupValue.normalizedName ?? ProcessBuilderRepository.normalizeName(taskCreationFormGroupValue.name ?? undefined),
        requireCustomImplementation: taskCreationFormGroupValue.requireCustomImplementation ?? false,
        requireDynamicInput: false,
        finalizesFlow: taskCreationFormGroupValue.isProcessOutput ?? false,
        customImplementation: taskCreationFormGroupValue.implementation?.text ?? undefined,
        output: taskCreationFormGroupValue.outputParamIdentifier,
      } as IFunction;
    }

    await this._applyFunctionConfiguration(taskCreationFormGroupValue, functionObject);
  }

  private async _applyFunctionConfiguration(taskCreationData: ITaskCreationFormGroupValue, referencedFunction: IFunction) {
    const inputParams = await this._extractInputParams(taskCreationData, referencedFunction);
    const functionIdentifier = referencedFunction.requireCustomImplementation ? await selectSnapshot(this._store.select(selectNextFunctionIdentifier())) : referencedFunction.identifier;
    const updatedFunction = {
      customImplementation: taskCreationData.implementation?.text ?? undefined,
      canFail: taskCreationData.canFail ?? false,
      name: taskCreationData.name ?? this._config.defaultFunctionName,
      identifier: functionIdentifier,
      normalizedName: taskCreationData.normalizedName ?? ProcessBuilderRepository.normalizeName(taskCreationData.name ?? undefined),
      output: referencedFunction.output,
      implementation: referencedFunction.implementation,
      inputTemplates: inputParams,
      requireCustomImplementation: false,
      requireDynamicInput: false,
      finalizesFlow: taskCreationData.isProcessOutput ?? false,
      requireStaticOutputDefinition: referencedFunction.requireStaticOutputDefinition,
      _isImplementation: true
    } as IFunction;

    this._store.dispatch(upsertIFunction(updatedFunction));
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
