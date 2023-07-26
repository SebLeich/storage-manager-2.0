import { ITaskCreationFormGroupValue } from "@/lib/process-builder/interfaces/task-creation-form-group-value.interface";
import { ITaskCreationPayload } from "@/lib/process-builder/interfaces/task-creation-payload.interface";
import { IC2mProcessor } from "../interfaces/c2m-processor.interface";
import { BpmnJsService } from "@/lib/process-builder/services/bpmn-js.service";
import { Injectable } from "@angular/core";
import { C2mProcessingObjects } from "../constants/c2m-processing-objects.constant";
import shapeTypes from "@/lib/bpmn-io/shape-types";

@Injectable()
export class EventC2MProcessor implements IC2mProcessor {

  constructor(private _bpmnJsService: BpmnJsService) { }

  public async processConfiguration({ taskCreationPayload }: { taskCreationPayload: ITaskCreationPayload, taskCreationFormGroupValue?: ITaskCreationFormGroupValue }, c2mProcessingObjects: Partial<C2mProcessingObjects>) {
    if (!c2mProcessingObjects?.updatedFunction) {
      return;
    }

    const resultingEndEvent = taskCreationPayload.configureActivity?.outgoing?.find(outgoing => outgoing.target.type === 'bpmn:EndEvent')?.target;
    if (c2mProcessingObjects.updatedFunction.finalizesFlow && !resultingEndEvent) {
      this._appendSequenceFlowEndEvent(taskCreationPayload);
    } 
    else if (!c2mProcessingObjects.updatedFunction?.finalizesFlow && resultingEndEvent) {
      this._bpmnJsService.modelingModule.removeElements([resultingEndEvent, ...resultingEndEvent.incoming]);
    }

    return Promise.resolve({});
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
}