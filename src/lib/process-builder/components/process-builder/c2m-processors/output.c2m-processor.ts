import { IBpmnJS, IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from "@/lib/process-builder/interfaces";
import { Inject, Injectable } from "@angular/core";
import { IC2MProcessor } from "../interfaces/c2m-processor.interface";
import { BPMN_JS } from "@/lib/process-builder/injection-token";
import { ITaskCreationPayload } from "@/lib/process-builder/interfaces/task-creation-payload.interface";
import { BpmnJsService } from "@/lib/process-builder/services/bpmn-js.service";
import { Store } from "@ngrx/store";
import { ITaskCreationFormGroupValue } from "@/lib/process-builder/interfaces/task-creation-form-group-value.interface";
import { selectSnapshot } from "@/lib/process-builder/globals/select-snapshot";
import { selectIFunction, selectIParam } from "@/lib/process-builder/store/selectors";
import shapeTypes from "@/lib/bpmn-io/shape-types";
import { BPMNJsRepository } from "@/lib/core/bpmn-js.repository";
import { IElement } from "@/lib/bpmn-io/interfaces/element.interface";

@Injectable()
export class OutputC2MProcessor implements IC2MProcessor {

    constructor(@Inject(BPMN_JS) private _bpmnJs: IBpmnJS, @Inject(PROCESS_BUILDER_CONFIG_TOKEN) private _config: IProcessBuilderConfig, private _bpmnJsService: BpmnJsService, private _store: Store) { }

    public async processConfiguration({ taskCreationPayload, taskCreationFormGroupValue }: { taskCreationPayload: ITaskCreationPayload, taskCreationFormGroupValue?: ITaskCreationFormGroupValue }) {
        const configureActivity = taskCreationPayload.configureActivity;
        if (!configureActivity || !taskCreationFormGroupValue) {
            return;
        }

        const referencedFunction = await selectSnapshot(this._store.select(selectIFunction(taskCreationFormGroupValue?.functionIdentifier)));
        if (!referencedFunction) {
            return;
        }

        if(referencedFunction.output == null && typeof taskCreationFormGroupValue.functionOutputParamIdentifier === 'number') {
            const outputParamElements = this._bpmnJsService.elementRegistryModule.filter((element) => element.type === shapeTypes.DataOutputAssociation && BPMNJsRepository.getDataParamId(element as IElement) === taskCreationFormGroupValue.functionOutputParamIdentifier);
            this._bpmnJsService.modelingModule.removeElements(outputParamElements);
            return;
        }

        if(referencedFunction.output == null){
            return;
        }

        const outputParam = await selectSnapshot(this._store.select(selectIParam(taskCreationFormGroupValue.outputParamIdentifier)));
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