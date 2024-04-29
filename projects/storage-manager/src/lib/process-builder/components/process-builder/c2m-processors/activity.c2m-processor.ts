import { ITaskCreationFormGroupValue } from "@/lib/process-builder/interfaces/task-creation-form-group-value.interface";
import { ITaskCreationPayload } from "@/lib/process-builder/interfaces/task-creation-payload.interface";
import { IC2MProcessor } from "../interfaces/c2m-processor.interface";
import { BPMNJsRepository } from "@/lib/core/bpmn-js.repository";
import { BpmnJsService } from "@/lib/process-builder/services/bpmn-js.service";
import { Inject, Injectable } from "@angular/core";
import { selectSnapshot } from "@/lib/process-builder/globals/select-snapshot";
import { Store } from "@ngrx/store";
import { selectFunction } from "@/lib/process-builder/store/selectors";
import { IBpmnJS } from "@/lib/process-builder/interfaces";
import { BPMN_JS } from "@/lib/process-builder/injection-token";
import shapeTypes from "@/lib/bpmn-io/shape-types";
import { ConfirmationComponent } from "@/lib/confirmation/components/confirmation/confirmation.component";
import { IConfirmationInput } from "@/lib/confirmation/interfaces/confirmation-input.interface";
import { MatDialog } from "@angular/material/dialog";
import { ITaskCreationOutput } from "../../dialog/task-creation/interfaces/task-creation-output.interface";
import { IC2SOutput } from "../../dialog/task-creation/interfaces/c2S-output.interface";

/**
 * that processor applies changes provided by a task creation form group value to the bpmn model
 */
@Injectable()
export class ActivityC2MProcessor implements IC2MProcessor {

  constructor(
    @Inject(BPMN_JS) private _bpmnJs: IBpmnJS,
    private _bpmnJsService: BpmnJsService,
    private _store: Store,
    private _dialog: MatDialog
  ) { }

  public async processConfiguration({ taskCreationPayload, formValue }: ITaskCreationOutput, c2SOutput: IC2SOutput) {
    const configureActivity = taskCreationPayload?.configureActivity;
    if (!configureActivity) {
      return;
    }

    if (!formValue) {
      const activityFunctionId = BPMNJsRepository.getActivityFunctionId(configureActivity);
      if (typeof activityFunctionId !== 'number') {
        this._bpmnJsService.modelingModule.removeElements([configureActivity]);
        return;
      }

      const referencedFunction = await selectSnapshot(this._store.select(selectFunction(activityFunctionId)));
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

    const referencedFunction = await selectSnapshot(this._store.select(selectFunction(c2SOutput.functionIdentifier)));
    if (!referencedFunction) {
      this._bpmnJsService.modelingModule.removeElements([configureActivity]);
      return;
    }

    BPMNJsRepository.setActivityFunctionId(this._bpmnJs, configureActivity, referencedFunction.identifier);

    const effectedActivities = this._bpmnJsService.elementRegistryModule.filter(element => element.type === shapeTypes.Task && BPMNJsRepository.getSLPBExtension(element.businessObject, 'ActivityExtension', (ext => ext.activityFunctionId)) === referencedFunction?.identifier);
    for (const activity of effectedActivities) {
      this._bpmnJsService.modelingModule.updateLabel(activity, referencedFunction.name);
    }
  }
}