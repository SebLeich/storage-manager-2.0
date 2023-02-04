import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { showAnimation } from 'src/lib/shared/animations/show-delayed.animation';
import { BpmnJsService } from '../../services/bpmn-js.service';
import { ProcessBuilderService } from '../../services/process-builder.service';
import { map, Subscription, startWith, switchMap, timer } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCurrentIBpmnJSModel } from '../../store/selectors/bpmn-js-model.selectors';
import { ProcessBuilderComponentService } from './process-builder-component.service';
import { upsertProcedure } from 'src/app/store/actions/i-pending-procedure.actions';
import shapeTypes from 'src/lib/bpmn-io/shape-types';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js.repository';
import { ConfirmationService } from 'src/lib/confirmation/services/confirmation.service';
import { selectIFunctions } from '../../store/selectors/function.selector';
import { selectSnapshot } from '../../globals/select-snapshot';
import { setIFunctionsCanFailFlag, updateIFunction } from '../../store/actions/function.actions';

@Component({
  selector: 'app-process-builder',
  templateUrl: './process-builder.component.html',
  styleUrls: ['./process-builder.component.sass'],
  animations: [showAnimation],
  providers: [ConfirmationService, ProcessBuilderComponentService]
})
export class ProcessBuilderComponent implements OnDestroy, OnInit {

  @ViewChild('diagramWrapper', { static: true }) private diagramWrapper!: ElementRef<HTMLDivElement>;

  public animationStatus$ = this._store.select(selectCurrentIBpmnJSModel).pipe(
    switchMap(() => timer(0).pipe(
      map(() => 'visible'),
      startWith('hidden')
    ))
  );

  private _subscription = new Subscription();

  constructor(
    public processBuilderService: ProcessBuilderService,
    public bpmnJsService: BpmnJsService,
    private _confirmationService: ConfirmationService,
    private _store: Store,
    private _processBuilderComponentService: ProcessBuilderComponentService,
  ) { }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public ngOnInit(): void {
    this.init();
  }

  private async init() {
    await this.bpmnJsService.attachBpmnModelToDomElement(this.diagramWrapper.nativeElement);

    this._subscription.add(
      this._processBuilderComponentService
        .taskEditingDialogResultReceived$
        .subscribe((args) => {
          this._processBuilderComponentService.applyTaskCreationConfig(args.taskCreationPayload, args.taskCreationData);
        })
    );

    this._subscription.add(
      this._processBuilderComponentService
        .paramEditorDialogResultReceived$
        .subscribe((args) => {
          console.log(args);
        })
    );

    this._subscription.add(
      this.bpmnJsService.taskEditingProcedure$
        .subscribe(procedure => {
          this._store.dispatch(upsertProcedure({ procedure }));
        })
    );

    this._subscription.add(
      BpmnJsService.elementDeletionRequested$.subscribe(async element => {
        switch (element.type) {
          case shapeTypes.Task:
            this.bpmnJsService.removeOutgoingDataObjectReferences(element);
            this.bpmnJsService.removeOutgoingGateways(element);
            this.bpmnJsService.modelingModule.removeElements([element]);
            break;

          case shapeTypes.ExclusiveGateway:
            const isErrorGateway = BPMNJsRepository.sLPBExtensionSetted(element.businessObject, 'GatewayExtension', (ext) => ext.gatewayType === 'error_gateway');
            if (isErrorGateway) {
              const comingFromActivities = element
                .incoming
                .filter(incoming => incoming.type === shapeTypes.SequenceFlow && incoming.source.type === shapeTypes.Task)
                .map(incoming => incoming.source);

              const referencedFunctionIdentifiers = comingFromActivities.map(activity => BPMNJsRepository.getSLPBExtension(activity.businessObject, 'ActivityExtension', (ext) => ext.activityFunctionId));
              const referencedFunctions = await selectSnapshot(this._store.select(selectIFunctions(referencedFunctionIdentifiers)));

              const result = await this._confirmationService.requestConfirmation(
                `${referencedFunctions.length === 1 ? 'One method' : referencedFunctions.length + ' methods'} will be changed`,
                `By deleting that gateway, you will remove the 'canFail'-flag from the methods listed below.<ul>${referencedFunctions.map(func => '<li>' + func.normalizedName + '</li>')}</ul><b>Do you want to proceed?</b>`
              );

              if (result) {
                const action = setIFunctionsCanFailFlag({ funcs: referencedFunctionIdentifiers, canFail: false });
                this._store.dispatch(action);
                this.bpmnJsService.modelingModule.removeElements([element]);
              }
            }
            break;
        }
      })
    );

    this.bpmnJsService.toolManagerUpdateEventFired$.subscribe(evt => console.log(evt));

  }

}
