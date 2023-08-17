import { ITaskCreationFormGroupValue } from "@/lib/process-builder/interfaces/task-creation-form-group-value.interface";
import { Inject, Injectable } from "@angular/core";
import { selectSnapshot } from "@/lib/process-builder/globals/select-snapshot";
import { Store } from "@ngrx/store";
import { selectIFunction, selectIParamsByNormalizedName, selectNextFunctionIdentifier } from "@/lib/process-builder/store/selectors";
import { IFunction, IInputParam, IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from "@/lib/process-builder/interfaces";
import { CodemirrorRepository } from "@/lib/core/codemirror.repository";
import { ProcessBuilderRepository } from "@/lib/core/process-builder-repository";
import { upsertIFunction } from "@/lib/process-builder/store";
import { IC2SProcessor } from "../interfaces/c2s-processor.interface";
import { ITaskCreationOutput } from "../../dialog/task-creation/interfaces/task-creation-output.interface";
import { FunctionOutputService } from "../services/function-output.service";

/**
 * that processor applies changes provided by a task creation form group value to the state
 */
@Injectable()
export class ActivityC2SProcessor implements IC2SProcessor {

  private readonly _functionOutputService = new FunctionOutputService(this._store);

  constructor(@Inject(PROCESS_BUILDER_CONFIG_TOKEN) private _config: IProcessBuilderConfig, private _store: Store) { }

  public async processConfiguration({ taskCreationPayload, formValue, selectedFunction, methodEvaluation }: ITaskCreationOutput) {
    const configureActivity = taskCreationPayload?.configureActivity;
    if (!configureActivity || !formValue) {
      return;
    }

    let functionObject = await selectSnapshot(this._store.select(selectIFunction(formValue.functionIdentifier)));
    if (!functionObject) {
      functionObject = {
        identifier: formValue.functionIdentifier,
        _isImplementation: true,
        requireCustomImplementation: selectedFunction.requireCustomImplementation ?? false,
        requireDynamicInput: false,
      } as IFunction;
    }

    const { outputParamIdentifier } = await this._functionOutputService.detectFunctionOutput(functionObject, methodEvaluation);

    functionObject = {
      ...functionObject,
      canFail: formValue.functionCanFail ?? false,
      name: formValue.functionName ?? this._config.defaultFunctionName,
      normalizedName: formValue.functionNormalizedName ?? ProcessBuilderRepository.normalizeName(formValue.functionName ?? undefined),
      finalizesFlow: false,
      customImplementation: formValue.functionImplementation?.text ?? undefined,
      output: outputParamIdentifier
    };

    await this._applyFunctionConfiguration(formValue, functionObject);
  }

  private async _applyFunctionConfiguration(taskCreationData: ITaskCreationFormGroupValue, referencedFunction: IFunction) {
    const inputParams = await this._extractInputParams(taskCreationData, referencedFunction);
    const functionIdentifier = referencedFunction.requireCustomImplementation ? await selectSnapshot(this._store.select(selectNextFunctionIdentifier())) : referencedFunction.identifier;
    const updatedFunction = {
      customImplementation: taskCreationData.functionImplementation?.text ?? undefined,
      canFail: taskCreationData.functionCanFail ?? false,
      name: taskCreationData.functionName ?? this._config.defaultFunctionName,
      identifier: functionIdentifier,
      normalizedName: taskCreationData.functionNormalizedName ?? ProcessBuilderRepository.normalizeName(taskCreationData.functionName ?? undefined),
      output: referencedFunction.output,
      implementation: referencedFunction.implementation,
      inputTemplates: inputParams,
      requireCustomImplementation: false,
      requireDynamicInput: false,
      finalizesFlow: false,
      requireStaticOutputDefinition: referencedFunction.requireStaticOutputDefinition,
      _isImplementation: true
    } as IFunction;

    this._store.dispatch(upsertIFunction(updatedFunction));
  }

  private async _extractInputParams(taskCreationData: ITaskCreationFormGroupValue, referencedFunction: IFunction): Promise<IInputParam[]> {
    const inputParams: IInputParam[] = [];
    if (referencedFunction.inputTemplates === 'dynamic' && typeof taskCreationData.outputParamInterface === 'string') {
      inputParams.push({ optional: false, interface: taskCreationData.outputParamInterface, name: taskCreationData.functionNormalizedName, type: 'object' });
    }
    else if (referencedFunction.requireCustomImplementation || referencedFunction.customImplementation) {
      const usedInputParams: { varName: string, propertyName: string | null }[] = taskCreationData.functionImplementation
        ? CodemirrorRepository.getUsedInputParams(undefined, taskCreationData.functionImplementation.text)
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
