import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-process-builder',
  templateUrl: './process-builder.component.html',
  styleUrls: ['./process-builder.component.scss'],
  animations: [showAnimation],
  providers: [ProcessBuilderComponentService]
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
          this._processBuilderComponentService.applyTaskCreationConfig(args.taskCreationPayload, args.taskCreationFormGroupValue);
        })
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
            const firstOuputProvidingActivity = this._getFirstProvidedOutputWithSLPBExtension(element, 'isProcessOutput');
            if (firstOuputProvidingActivity) {
              BPMNJsRepository.updateBpmnElementSLPBExtension(this.bpmnJsService.bpmnJs, firstOuputProvidingActivity.businessObject, 'DataObjectExtension', (ext) => ext.isProcessOutput = false);
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
          BPMNJsRepository.updateBpmnElementSLPBExtension(this.bpmnJsService.bpmnJs, firstOutputMatchingActivity.businessObject, 'DataObjectExtension', (ext) => ext.isProcessOutput = true);
        }
        this.bpmnJsService.modelingModule.appendShape(element, { type: shapeTypes.EndEvent });
        this.bpmnJsService.saveCurrentBpmnModel();
      })
    );
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
