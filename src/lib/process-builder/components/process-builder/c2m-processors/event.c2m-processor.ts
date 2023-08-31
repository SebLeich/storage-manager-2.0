import { ITaskCreationFormGroupValue } from "@/lib/process-builder/interfaces/task-creation-form-group-value.interface";
import { ITaskCreationPayload } from "@/lib/process-builder/interfaces/task-creation-payload.interface";
import { IC2MProcessor } from "../interfaces/c2m-processor.interface";
import { BpmnJsService } from "@/lib/process-builder/services/bpmn-js.service";
import { Injectable } from "@angular/core";
import shapeTypes from "@/lib/bpmn-io/shape-types";

@Injectable()
export class EventC2MProcessor implements IC2MProcessor {

  constructor(private _bpmnJsService: BpmnJsService) { }

  public processConfiguration({ taskCreationPayload, taskCreationFormGroupValue }: { taskCreationPayload: ITaskCreationPayload, taskCreationFormGroupValue?: ITaskCreationFormGroupValue }): void {
    if(!taskCreationFormGroupValue){
      return;
    }
    
    const finalizesFlow = false;

    const resultingEndEvent = taskCreationPayload.configureActivity?.outgoing?.find(outgoing => outgoing.target.type === 'bpmn:EndEvent')?.target;
    if (finalizesFlow && !resultingEndEvent) {
      this._appendSequenceFlowEndEvent(taskCreationPayload);
    } 
    else if (!finalizesFlow && resultingEndEvent) {
      this._bpmnJsService.modelingModule.removeElements([resultingEndEvent, ...resultingEndEvent.incoming]);
    }
  }

  private _appendSequenceFlowEndEvent(taskCreationPayload: ITaskCreationPayload) {
    if (!taskCreationPayload.configureActivity) {
      return;
    }

    this._bpmnJsService.modelingModule.appendShape(taskCreationPayload.configureActivity, { type: shapeTypes.EndEvent }, {
      x: taskCreationPayload.configureActivity.x + 200,
      y: taskCreationPayload.configureActivity.y + 40
    });
  }
}