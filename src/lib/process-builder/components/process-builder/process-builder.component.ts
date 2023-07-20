import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { showAnimation } from 'src/lib/shared/animations/show-delayed.animation';
import { BpmnJsService } from '../../services/bpmn-js.service';
import { ProcessBuilderService } from '../../services/process-builder.service';
import { map, Subscription, startWith, switchMap, timer } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCurrentIBpmnJSModel } from '../../store/selectors/bpmn-js-model.selectors';
import { ProcessBuilderComponentService } from './process-builder-component.service';
import shapeTypes from 'src/lib/bpmn-io/shape-types';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js.repository';
import { upsertProcedure } from '@procedure';
import { IElement } from 'src/lib/bpmn-io/interfaces/element.interface';
import { IBpmnJS } from '../../interfaces/bpmn-js.interface';
import { BPMN_JS } from '@process-builder/injection';
import { C2M_INJECTION_TOKEN } from './constants/c2m-processor.constant';
import { ActivityC2MProcessor } from './c2m-processors/activity.c2m-processor';
import { IC2mProcessor } from './interfaces/c2m-processor.interface';
import { ConnectorC2MProcessor } from './c2m-processors/connector.c2m-processor';
import { C2mProcessingObjects } from './constants/c2m-processing-objects.constant';
import { ITaskCreationPayload } from '../../interfaces/task-creation-payload.interface';
import { ITaskCreationFormGroupValue } from '../../interfaces/task-creation-form-group-value.interface';
import { EventC2MProcessor } from './c2m-processors/event.c2m-processor';
import { DataC2MProcessor } from './c2m-processors/data.c2m-processor';
import { GatewayC2MProcessor } from './c2m-processors/gateway.c2m-processor';

@Component({
  selector: 'app-process-builder',
  templateUrl: './process-builder.component.html',
  styleUrls: ['./process-builder.component.scss'],
  animations: [showAnimation],
  providers: [
    ProcessBuilderComponentService,
    { provide: C2M_INJECTION_TOKEN, useClass: ActivityC2MProcessor, multi: true },
    { provide: C2M_INJECTION_TOKEN, useClass: ConnectorC2MProcessor, multi: true },
    { provide: C2M_INJECTION_TOKEN, useClass: DataC2MProcessor, multi: true },
    { provide: C2M_INJECTION_TOKEN, useClass: EventC2MProcessor, multi: true },
    { provide: C2M_INJECTION_TOKEN, useClass: GatewayC2MProcessor, multi: true },
  ]
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
    @Inject(BPMN_JS) private _bpmnJs: IBpmnJS,
    public processBuilderService: ProcessBuilderService,
    public bpmnJsService: BpmnJsService,
    private _store: Store,
    private _processBuilderComponentService: ProcessBuilderComponentService,
    @Inject(C2M_INJECTION_TOKEN) private _c2mProcessors: IC2mProcessor[]
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
        .subscribe(async (args) => await this._processC2m(args))
    );

    this._subscription.add(
      this.bpmnJsService.taskEditingProcedure$
        .subscribe((procedure) => this._store.dispatch(upsertProcedure({ procedure })))
    );

    this._subscription.add(
      BpmnJsService.elementDeletionRequested$.subscribe(async element => {
        switch (element.type) {
          case shapeTypes.Task:
            await this._processBuilderComponentService.tryDeleteFunction(element);
            break;

          case shapeTypes.ExclusiveGateway:
            await this._processBuilderComponentService.tryDeleteErrorGateway(element);
            break;

          case shapeTypes.EndEvent:
            // eslint-disable-next-line no-case-declarations
            const firstOuputProvidingActivity = this._getFirstProvidedOutputWithSLPBExtension(element, 'isProcessOutput');
            if (firstOuputProvidingActivity) {
              BPMNJsRepository.updateBpmnElementSLPBExtension(this._bpmnJs, firstOuputProvidingActivity.businessObject, 'DataObjectExtension', (ext) => ext.isProcessOutput = false);
            }
            this.bpmnJsService.modelingModule.removeElements([element]);
            this.bpmnJsService.saveCurrentBpmnModel();
            break;

          default:
            this.bpmnJsService.modelingModule.removeElements([element]);
            break;
        }
      })
    );

    this._subscription.add(
      BpmnJsService.elementEndEventCreationRequested.subscribe(async element => {
        const firstOutputMatchingActivity = this._getFirstProvidedOutputWithSLPBExtension(element, 'matchesProcessOutputInterface');
        if (firstOutputMatchingActivity) {
          BPMNJsRepository.updateBpmnElementSLPBExtension(this._bpmnJs, firstOutputMatchingActivity.businessObject, 'DataObjectExtension', (ext) => ext.isProcessOutput = true);
        }
        this.bpmnJsService.modelingModule.appendShape(element, { type: shapeTypes.EndEvent });
        this.bpmnJsService.saveCurrentBpmnModel();
      })
    );
  }

  private async _processC2m(args: { taskCreationPayload: ITaskCreationPayload, taskCreationFormGroupValue: ITaskCreationFormGroupValue }) {
    let c2mChanges: Partial<C2mProcessingObjects> = {},
      nextSteps = this._c2mProcessors.filter(c2mProcessor => !c2mProcessor.requirements || c2mProcessor.requirements.length === 0);

    const finished = [] as IC2mProcessor[];

    while (nextSteps.length > 0) {
      for (const step of nextSteps) {
        const result = await step.processConfiguration(args, c2mChanges);
        if(result){
          c2mChanges = { ...c2mChanges, ...result };
        }

        finished.push(step);
      }

      nextSteps = this._c2mProcessors.filter(c2mProcessor => {
        if (finished.findIndex(finishedStep => finishedStep.constructor.name === c2mProcessor.constructor.name) > -1) {
          return false;
        }

        return (c2mProcessor.requirements as []).every(requirement => Object.keys(c2mChanges).includes(requirement));
      });
    }
  }

  private _getFirstProvidedOutputWithSLPBExtension(currentElement: IElement, extension: 'matchesProcessOutputInterface' | 'isProcessOutput') {
    let sourceElement: IElement | undefined = currentElement;
    while (sourceElement) {
      const dataOutputRef = sourceElement.outgoing.find(outgoing => outgoing.type === shapeTypes.DataOutputAssociation)?.target;
      if (dataOutputRef) {
        const matchesProcessOutputInterface = BPMNJsRepository.getSLPBExtension(dataOutputRef.businessObject, 'DataObjectExtension', (ext) => ext[extension]);
        if (matchesProcessOutputInterface) {
          return dataOutputRef;
        }
      }

      sourceElement = sourceElement.incoming.find(incoming => incoming.type === shapeTypes.SequenceFlow && incoming.source?.type === shapeTypes.Task)?.source;
    }
    return undefined;
  }
}
