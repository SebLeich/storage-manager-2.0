import { Injectable } from "@angular/core";
import { IC2MProcessor } from "../interfaces/c2m-processor.interface";
import { BpmnJsService } from "@/lib/process-builder/services/bpmn-js.service";
import { Store } from "@ngrx/store";
import { selectSnapshot } from "@/lib/process-builder/globals/select-snapshot";
import { selectIFunction, selectIParamByNormalizedName } from "@/lib/process-builder/store/selectors";
import shapeTypes from "@/lib/bpmn-io/shape-types";
import { BPMNJsRepository } from "@/lib/core/bpmn-js.repository";
import { IElement } from "@/lib/bpmn-io/interfaces/element.interface";
import { ITaskCreationOutput } from "../../dialog/task-creation/interfaces/task-creation-output.interface";
import { IC2SOutput } from "../../dialog/task-creation/interfaces/c2S-output.interface";

@Injectable()
export class InputC2MProcessor implements IC2MProcessor {
    
    constructor(private _bpmnJsService: BpmnJsService, private _store: Store) { }

    public async processConfiguration({ taskCreationPayload, formValue, methodEvaluation }: ITaskCreationOutput, c2SOutput: IC2SOutput) {
        const configureActivity = taskCreationPayload.configureActivity;
        if (!configureActivity || !formValue) {
            return;
        }

        const referencedFunction = await selectSnapshot(this._store.select(selectIFunction(c2SOutput.functionIdentifier)));
        if(!referencedFunction) {
            return;
        }

        const inputParams = await Promise.all((methodEvaluation.inputParamCandidates ?? []).map((paramName) => selectSnapshot(this._store.select(selectIParamByNormalizedName(paramName)))));
        const inputParamIds = inputParams.map((param) => param?.identifier ?? -1);
        const dataObjectRefs = this._bpmnJsService
            .elementRegistryModule
            .filter((element) => element.type === shapeTypes.DataObjectReference && inputParamIds.indexOf(BPMNJsRepository.getDataParamId(element as IElement) ?? -1) > -1);
        
        for(const reference of dataObjectRefs){
            this._bpmnJsService.modelingModule.connect(reference as IElement, configureActivity as IElement);
        }
    }
}