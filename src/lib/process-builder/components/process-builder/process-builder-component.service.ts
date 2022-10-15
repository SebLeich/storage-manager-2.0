import { Injectable } from '@angular/core';
import { BpmnJsService } from '../../services/bpmn-js.service';
import { DialogService } from '../../services/dialog.service';
import { combineLatest, map, of, Subscription, startWith, switchMap, timer } from 'rxjs';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js.repository';
import { TaskCreationStep } from '../../globals/task-creation-step';
import { ITaskCreationPayload } from '../../interfaces/i-task-creation-payload.interface';
import { ITaskCreationData } from '../../interfaces/i-task-creation-data.interface';

@Injectable()
export class ProcessBuilderComponentService {

  public taskEditingDialogResultReceived$ = this._bpmnJsService.bufferedTaskEditingEvents$
    .pipe(
      switchMap((events) => {
        const functionSelectionConfig = events.find(event => event.taskCreationStep === TaskCreationStep.ConfigureFunctionSelection);
        const functionIdentifier = BPMNJsRepository.getSLPBExtension<number>(functionSelectionConfig?.element?.businessObject, 'ActivityExtension', (ext) => ext.activityFunctionId) ?? null;
        const
          taskCreationPayload = {
            configureActivity: events.find(event => event.taskCreationStep === TaskCreationStep.ConfigureFunctionSelection)?.element,
            configureIncomingErrorGatewaySequenceFlow: events.find(event => event.taskCreationStep === TaskCreationStep.ConfigureErrorGatewayEntranceConnection)?.element
          } as ITaskCreationPayload,
          taskCreationData = {
            functionIdentifier: functionIdentifier
          } as ITaskCreationData;

        return combineLatest([
          of(taskCreationPayload),
          this._dialogService.configTaskCreation(
            {
              taskCreationData: taskCreationData,
              taskCreationPayload: taskCreationPayload
            }
          )
        ]).pipe(
          map(([taskCreationPayload, taskCreationData]: [ITaskCreationPayload, ITaskCreationData]) => ({ taskCreationPayload, taskCreationData }))
        );
      })
    );

  constructor(private _dialogService: DialogService, private _bpmnJsService: BpmnJsService) { }
}
