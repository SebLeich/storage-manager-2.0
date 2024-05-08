import { ITaskCreationFormGroupValue } from "@/lib/process-builder/interfaces/task-creation-form-group-value.interface";
import { Inject, Injectable } from "@angular/core";
import { selectSnapshot } from "@/lib/process-builder/globals/select-snapshot";
import { Store } from "@ngrx/store";
import { selectIParam, selectIParamsByNormalizedName } from "@/lib/process-builder/store/selectors";
import { IFunction, IInputParam, IParam, IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from "@/lib/process-builder/interfaces";
import { CodemirrorRepository } from "@/lib/core/codemirror.repository";
import { ProcessBuilderRepository } from "@/lib/core/process-builder-repository";
import { upsertIFunction } from "@/lib/process-builder/store";
import { IC2SProcessor } from "../interfaces/c2s-processor.interface";
import { ITaskCreationOutput } from "../../dialog/task-creation/interfaces/task-creation-output.interface";
import { FunctionOutputService } from "../services/function-output.service";
import { FunctionService } from "../services/function.service";
import { IC2SOutput } from "../../dialog/task-creation/interfaces/c2S-output.interface";

/**
 * that processor applies changes provided by a task creation form group value to the state
 */
@Injectable()
export class ActivityC2SProcessor implements IC2SProcessor {

  private readonly _functionService = new FunctionService(this._store);
  private readonly _functionOutputService = new FunctionOutputService(this._store);

  constructor(@Inject(PROCESS_BUILDER_CONFIG_TOKEN) private _config: IProcessBuilderConfig, private _store: Store) { }

  public async processConfiguration({ taskCreationPayload, formValue, selectedFunction, methodEvaluation }: ITaskCreationOutput, c2SOutput: IC2SOutput) {
    const configureActivity = taskCreationPayload?.configureActivity;
    if (!configureActivity || !formValue) {
      return;
    }

    const { functionIdentifier,  } = await this._functionService.detectFunction(selectedFunction),
      { outputParamIdentifier } = await this._functionOutputService.detectFunctionOutput(selectedFunction, methodEvaluation),
      usedParams = Array.isArray(methodEvaluation.inputParamCandidates)? await selectSnapshot(this._store.select(selectIParamsByNormalizedName(methodEvaluation.inputParamCandidates))): [];

    const inputParams = usedParams.map((usedParam: IParam) => {
      return {
        optional: false,
        interface: typeof usedParam.interface === 'number' ? usedParam.interface : undefined,
        name: usedParam.normalizedName,
        type: 'object'
      } as IInputParam
    });

    const functionObject: IFunction = {
      ...selectedFunction,
      identifier: functionIdentifier,
      _isImplementation: true,
      requireCustomImplementation: selectedFunction.requireCustomImplementation ?? false,
      requireDynamicInput: false,
      canFail: formValue.functionCanFail ?? false,
      name: formValue.functionName ?? this._config.defaultFunctionName,
      normalizedName: formValue.functionNormalizedName ?? ProcessBuilderRepository.normalizeName(formValue.functionName ?? undefined),
      finalizesFlow: formValue.functionFinalizesFlow ?? false,
      customImplementation: formValue.functionImplementation?.text ?? undefined,
      output: outputParamIdentifier,
      inputTemplates: inputParams,
    };

    this._store.dispatch(upsertIFunction(functionObject));

    c2SOutput.functionIdentifier = functionIdentifier;
  }
}
