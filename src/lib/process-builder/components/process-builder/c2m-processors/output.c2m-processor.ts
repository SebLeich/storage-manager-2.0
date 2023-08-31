import { IBpmnJS, IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from "@/lib/process-builder/interfaces";
import { Inject, Injectable } from "@angular/core";
import { IC2MProcessor } from "../interfaces/c2m-processor.interface";
import { BPMN_JS } from "@/lib/process-builder/injection-token";
import { BpmnJsService } from "@/lib/process-builder/services/bpmn-js.service";
import { Store } from "@ngrx/store";
import { selectSnapshot } from "@/lib/process-builder/globals/select-snapshot";
import { selectFunction, selectIParam } from "@/lib/process-builder/store/selectors";
import shapeTypes from "@/lib/bpmn-io/shape-types";
import { BPMNJsRepository } from "@/lib/core/bpmn-js.repository";
import { IElement } from "@/lib/bpmn-io/interfaces/element.interface";
import { ITaskCreationOutput } from "../../dialog/task-creation/interfaces/task-creation-output.interface";
import { FunctionOutputService } from "../services/function-output.service";
import { IC2SOutput } from "../../dialog/task-creation/interfaces/c2S-output.interface";

@Injectable()
export class OutputC2MProcessor implements IC2MProcessor {

    private readonly _functionOutputService = new FunctionOutputService(this._store);
    
    constructor(@Inject(BPMN_JS) private _bpmnJs: IBpmnJS, @Inject(PROCESS_BUILDER_CONFIG_TOKEN) private _config: IProcessBuilderConfig, private _bpmnJsService: BpmnJsService, private _store: Store) { }

    public async processConfiguration({ taskCreationPayload, formValue, methodEvaluation }: ITaskCreationOutput, c2SOutput: IC2SOutput) {
        const configureActivity = taskCreationPayload.configureActivity;
        if (!configureActivity || !formValue) {
            return;
        }

        const referencedFunction = await selectSnapshot(this._store.select(selectFunction(c2SOutput.functionIdentifier)));
        if (!referencedFunction) {
            return;
        }

        const { outputParamIsRemoved, outputParamIdentifier } = await this._functionOutputService.detectFunctionOutput(referencedFunction, methodEvaluation);
        if(outputParamIsRemoved) {
            const outputParamElements = this._bpmnJsService.elementRegistryModule.filter((element) => element.type === shapeTypes.DataOutputAssociation && BPMNJsRepository.getDataParamId(element as IElement) === outputParamIdentifier);
            this._bpmnJsService.modelingModule.removeElements(outputParamElements);
            return;
        }

        if(referencedFunction.output == null){
            return;
        }

        const outputParam = await selectSnapshot(this._store.select(selectIParam(outputParamIdentifier)));
        if(!outputParam){
            return;
        }

        BPMNJsRepository.appendOutputParam(
            this._bpmnJs,
            taskCreationPayload.configureActivity as IElement,
            outputParam.identifier,
            outputParam.name ?? 'no param name',
            outputParam.interface,
            outputParam.isProcessOutput ?? false,
            true,
            this._config.expectInterface
        );
    }
}