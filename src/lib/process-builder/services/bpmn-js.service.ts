import { Inject, Injectable } from '@angular/core';
import { v4 as generateGuid } from 'uuid';
import { Subject } from 'rxjs';
import { IBpmnJS } from '../interfaces/bpmn-js.interface';
import { getCanvasModule, getDirectEditingModule, getElementRegistryModule, getEventBusModule, getGraphicsFactory, getModelingModule, getTooltipModule, getZoomScrollModule } from 'src/lib/bpmn-io/bpmn-modules';
import { BehaviorSubject, buffer, combineLatest, debounceTime, delay, filter, from, map, merge, Observable, scan, shareReplay, startWith, switchMap, throttleTime, timer } from 'rxjs';
import { IConnectionCreatePostExecutedEvent } from 'src/lib/bpmn-io/interfaces/connection-create-post-executed-event.interface';
import { ICanvasModule, IDirectEditingModule, IElementRegistryModule, IModelingModule, ITooltipModule, IZoomScrollModule } from '@bpmn-io/modules';
import { IProcessValidationResult } from '../interfaces/validation-result.interface';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js.repository';
import { Store } from '@ngrx/store';
import { selectCurrentIBpmnJSModel, selectRecentlyUsedIBpmnJSModel } from '../store/selectors/bpmn-js-model.selectors';
import { IDirectEditingEvent, IEvent, IShapeAddedEvent, IShapeCreateEvent, IShapeDeleteExecutedEvent, IViewboxChangedEvent } from '@bpmn-io/events';
import { isEqual } from 'lodash';
import { addIBpmnJSModel, setCurrentIBpmnJSModel, updateCurrentIBpmnJSModel } from '../store/actions/bpmn-js-model.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { selectSnapshot } from '../globals/select-snapshot';
import defaultBpmnXmlConstant from '../globals/default-bpmn-xml.constant';
import moment from 'moment';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from '../interfaces/process-builder-config.interface';
import { TaskCreationStep } from '../globals/task-creation-step';
import { IProcedure } from 'src/lib/procedure-store/interfaces/procedure.interface';
import { TaskEditingStatus } from '../types/task-editing-status.type';
import shapeTypes from 'src/lib/bpmn-io/shape-types';
import { IElement } from 'src/lib/bpmn-io/interfaces/element.interface';
import IPipeline from 'src/lib/pipeline-store/interfaces/pipeline.interface';
import { selectFunction, selectIParam } from '@process-builder/selectors';
import { IConnector } from 'src/lib/bpmn-io/interfaces/connector.interface';
import { IPipelineAction } from 'src/lib/pipeline-store/interfaces/pipeline-action.interface';
import { ConfirmationService } from 'src/lib/confirmation/services/confirmation.service';
import { Router } from '@angular/router';
import { addPipeline, removePipeline, setSelectedPipeline } from 'src/lib/pipeline-store/store/actions/pipeline.actions';
import { addIPipelineActions } from 'src/lib/pipeline-store/store/actions/pipeline-action.actions';
import { selectPipelineByBpmnJsModel } from 'src/lib/pipeline-store/store/selectors/pipeline.selectors';
import { GatewayType } from '../types/gateway.type';
import { BPMN_JS } from '@process-builder/injection';
import { IBpmnJSModel } from '../interfaces';

@Injectable()
export class BpmnJsService {

  public attachEventFired$ = new Observable<IEvent>((subscriber) => this.eventBusModule.on('attach', (evt) => {
    subscriber.next(evt);
  }));

  public connectionCreatePostExecutedEventFired$ = new Observable<IConnectionCreatePostExecutedEvent>((subscriber) => this.eventBusModule.on('commandStack.connection.create.postExecuted', (evt) => {
    subscriber.next(evt);
  }));

  public detachEventFired$ = new Observable<IEvent>((subscriber) => this.eventBusModule.on('detach', (evt) => {
    subscriber.next(evt);
  }));

  public directEditingEventFired$ = new Observable<IDirectEditingEvent>((subscriber) => this.eventBusModule.on('directEditing.activate', (evt) => {
    this.directEditingModule.cancel();
    subscriber.next(evt);
  }));

  public elementChangedEventFired$ = new Observable<IEvent>((subscriber) => this.eventBusModule.on('element.changed', (evt) => {
    subscriber.next(evt);
  }));

  public elementHover$ = new Observable<IEvent>((subscriber) => this.eventBusModule.on('element.hover', (evt) => {
    subscriber.next(evt);
  }));

  public shapeAddedEventFired$ = new Observable<IShapeAddedEvent>((subscriber) => this.eventBusModule.on('shape.added', (evt) => {
    subscriber.next(evt);
  }));

  public shapeCreatedPostExecutedEventFired$ = new Observable<IShapeCreateEvent>((subscriber) => this.eventBusModule.on('commandStack.shape.create.postExecuted', (evt) => {
    subscriber.next(evt);
  }));

  public shapeRemoveEventFired$ = new Observable<IEvent>((subscriber) => this.eventBusModule.on('shape.remove', (evt) => {
    subscriber.next(evt);
  }));

  public shapeDeletePreExecuteEventFired$ = new Observable<IShapeDeleteExecutedEvent>((subscriber) => this.eventBusModule.on('commandStack.shape.delete.preExecute', (evt) => {
    subscriber.next(evt);
  }));

  public shapeDeletePostExecutedEventFired$ = new Observable<IShapeDeleteExecutedEvent>((subscriber) => this.eventBusModule.on('commandStack.shape.delete.postExecuted', (evt) => {
    subscriber.next(evt);
  }));

  public shapeDeleteExecutedEventFired$ = new Observable<IShapeDeleteExecutedEvent>((subscriber) => this.eventBusModule.on('commandStack.shape.delete.executed', (evt) => {
    subscriber.next(evt);
  }));

  public toolManagerUpdateEventFired$ = new Observable<IEvent>((subscriber) => this.eventBusModule.on('tool-manager.update', (evt) => {
    subscriber.next(evt);
  }));

  public viewboxChangedEventFired$ = new Observable<IViewboxChangedEvent>((subscriber) => this.eventBusModule.on('canvas.viewbox.changed', (evt) => {
    subscriber.next(evt);
  }));

  public eventFired$ = merge(
    this.attachEventFired$.pipe(map(event => ({ event: event, type: 'attach' }))),
    this.connectionCreatePostExecutedEventFired$.pipe(map(event => ({ event: event, type: 'commandStack.connection.create.postExecuted' }))),
    this.detachEventFired$.pipe(map(event => ({ event: event, type: 'detach' }))),
    this.directEditingEventFired$.pipe(map(event => ({ event: event, type: 'directEditing.activate' }))),
    this.elementChangedEventFired$.pipe(map(event => ({ event: event, type: 'element.changed' }))),
    this.elementHover$.pipe(map(event => ({ event: event, type: 'element.hover' }))),
    this.shapeAddedEventFired$.pipe(map(event => ({ event: event, type: 'shape.added' }))),
    this.shapeDeleteExecutedEventFired$.pipe(map(event => ({ event: event, type: 'commandStack.shape.delete.executed' }))),
    this.shapeRemoveEventFired$.pipe(map(event => ({ event: event, type: 'shape.remove' }))),
    this.toolManagerUpdateEventFired$.pipe(map(event => ({ event: event, type: 'tool-manager.update' }))),
    this.viewboxChangedEventFired$.pipe(map(event => ({ event: event, type: 'canvas.viewbox.changed' }))),
  );

  public taskEditingEventFired$ = merge(
    this.directEditingEventFired$.pipe(
      filter(event => event?.active?.element?.type === shapeTypes.Task),
      map(event => ({
        taskCreationStep: TaskCreationStep.ConfigureFunctionSelection,
        element: event.active.element
      }))
    ),
    this.connectionCreatePostExecutedEventFired$.pipe(
      filter(event => event.context.source.type === shapeTypes.ExclusiveGateway),
      map(event => ({
        taskCreationStep: TaskCreationStep.ConfigureErrorGatewayEntranceConnection,
        element: event.context.connection
      }))
    ),
  );

  public dataObjectReferenceEditingEventFired$ = this.directEditingEventFired$.pipe(
    filter(event => event?.active?.element?.type === shapeTypes.DataObjectReference)
  );

  public bufferedTaskEditingEvents$ = this.taskEditingEventFired$.pipe(
    buffer(this.taskEditingEventFired$.pipe(debounceTime(500)))
  );

  public bufferedDataObjectReferenceEditingEvents$ = this.dataObjectReferenceEditingEventFired$.pipe(
    buffer(this.dataObjectReferenceEditingEventFired$.pipe(debounceTime(500)))
  );

  public potentialModelChangeEventFired$ = merge(
    this.attachEventFired$.pipe(map(event => ({ event: event, type: 'attach' }))),
    this.connectionCreatePostExecutedEventFired$.pipe(map(event => ({ event: event, type: 'commandStack.connection.create.postExecuted' }))),
    this.detachEventFired$.pipe(map(event => ({ event: event, type: 'detach' }))),
    this.directEditingEventFired$.pipe(map(event => ({ event: event, type: 'directEditing.activate' }))),
    this.elementChangedEventFired$.pipe(map(event => ({ event: event, type: 'element.changed' }))),
    this.shapeAddedEventFired$.pipe(map(event => ({ event: event, type: 'shape.added' }))),
    this.shapeDeleteExecutedEventFired$.pipe(map(event => ({ event: event, type: 'commandStack.shape.delete.executed' }))),
    this.shapeRemoveEventFired$.pipe(map(event => ({ event: event, type: 'shape.remove' }))),
    this.toolManagerUpdateEventFired$.pipe(map(event => ({ event: event, type: 'tool-manager.update' }))),
    this.viewboxChangedEventFired$.pipe(map(event => ({ event: event, type: 'canvas.viewbox.changed' }))),
  );

  public validation$: Observable<undefined | null | IProcessValidationResult> = this.potentialModelChangeEventFired$.pipe(
    throttleTime(500),
    map(() => BPMNJsRepository.validateProcess(this._bpmnJs)),
    shareReplay(1),
    delay(0)
  );

  public validationContainsErrors$ = this.validation$.pipe(
    map(validation => (validation?.errors?.length ?? 0) > 0)
  );

  public bpmnJsLoggingEnabled = false;

  public status$: Observable<TaskEditingStatus> = merge(
    this.taskEditingEventFired$.pipe(
      map(() => 'collecting' as TaskEditingStatus)
    ),
    this.dataObjectReferenceEditingEventFired$.pipe(
      map(() => 'collecting' as TaskEditingStatus)
    ),
    this.taskEditingEventFired$.pipe(debounceTime(500)).pipe(map(() => {
      return 'idle' as TaskEditingStatus;
    })),
    this.dataObjectReferenceEditingEventFired$.pipe(debounceTime(500)).pipe(map(() => {
      return 'idle' as TaskEditingStatus;
    }))
  ).pipe(startWith('idle' as TaskEditingStatus));

  public taskEditingProcedure$ = this.status$.pipe(
    scan(
      (previousValue: IProcedure, status: TaskEditingStatus) => {
        return { ...previousValue, progress: status === 'idle' };
      },
      { guid: generateGuid(), progress: false, startedUnix: moment().unix(), finishedUnix: null } as IProcedure
    )
  );

  private currentBpmnJSModel$ = this._store.select(selectCurrentIBpmnJSModel);

  private _containsChanges = new BehaviorSubject<boolean>(false);
  public containsChanges$ = this._containsChanges.asObservable();

  private _isSaving = new BehaviorSubject<boolean>(false);
  public isSaving$ = this._isSaving.asObservable();

  public static elementDeletionRequested$ = new Subject<IElement>();
  public static elementEndEventCreationRequested = new Subject<IElement>();

  constructor(
    @Inject(PROCESS_BUILDER_CONFIG_TOKEN) private _config: IProcessBuilderConfig,
    @Inject(BPMN_JS) private _bpmnJs: IBpmnJS,
    private _store: Store,
    private _snackBar: MatSnackBar,
    private _confirmationService: ConfirmationService,
    private _router: Router
  ) {
    this._setUp();
  }

  public async attachBpmnModelToDomElement(parent: HTMLDivElement) {
    this._bpmnJs.attachTo(parent);
    let recentlyUsedModel = await selectSnapshot(this._store.select(selectRecentlyUsedIBpmnJSModel()));
    if (!recentlyUsedModel) {
      recentlyUsedModel = {
        'guid': generateGuid(),
        'created': moment().format('yyyy-MM-ddTHH:mm:ss'),
        'description': null,
        'name': this._config.defaultBpmnModelName,
        'xml': defaultBpmnXmlConstant,
        'lastModified': moment().format('yyyy-MM-ddTHH:mm:ss')
      };
      this._store.dispatch(addIBpmnJSModel(recentlyUsedModel));
    }
    this._store.dispatch(setCurrentIBpmnJSModel(recentlyUsedModel.guid));
  }

  public async compile(bpmnJsModelIdentifier: string, name: string = generateGuid()) {
    const existingPipeline = await selectSnapshot(this._store.select(selectPipelineByBpmnJsModel(bpmnJsModelIdentifier)));
    if (existingPipeline) {
      this._store.dispatch(removePipeline(existingPipeline));
    }

    const startEvent = BPMNJsRepository.getStartEvents(this.elementRegistryModule)[0];
    let cursor: { element: IElement, gatewayType?: GatewayType, successorFor: IElement[] } | null = { element: startEvent.outgoing[0].target, successorFor: [] },
      stack: { element: IElement, successorFor: IElement[], gatewayType: GatewayType }[] = [];
      
    const pipeline: IPipeline = { id: generateGuid(), bpmnJsModelReference: bpmnJsModelIdentifier, name: name, solutionReference: null },
      pipelineActions: IPipelineAction[] = [];

    let anchestors: IPipelineAction[] = [], index = 0;
    while (cursor) {
      if (cursor) {
        if(cursor.element.type === shapeTypes.Task){
          const { action } = await this._buildPipelineAction(index, pipeline, cursor.element);
          anchestors.forEach((anchestor: IPipelineAction) => {
            anchestor[cursor?.gatewayType === 'Success' ? 'onSuccess' : 'onError'] = action.identifier;
          });
          pipelineActions.push(action);
          anchestors = [action];
        }

        const connectors: IConnector[] = cursor.element.outgoing.filter(outgoing => outgoing.type === shapeTypes.SequenceFlow);
        const mapping = connectors.map(connector => {
          const connectorGatewayType = BPMNJsRepository.getSLPBExtension(connector.businessObject, 'SequenceFlowExtension', (ext) => ext.sequenceFlowType);
          const successorFor = this._getLastActivities(connector);
          return {
            element: connector.target,
            successorFor: successorFor,
            gatewayType: connectorGatewayType === 'error' ? 'Error' : 'Success' as GatewayType
          };
        });
        cursor = mapping[0];
        stack.push(...mapping.slice(1));

        index++;
      }

      if (!cursor) {
        cursor = stack[0];
        stack = stack.slice(1);

        const successorForIdentifiers = cursor?.successorFor.map(successor => successor.id) ?? [];
        anchestors = pipelineActions.filter((action) => successorForIdentifiers.indexOf(action.bpmnElementIdentifier) > -1);
      }
    }

    this._store.dispatch(addPipeline(pipeline));
    this._store.dispatch(addIPipelineActions(pipelineActions));

    const redirect = await this._confirmationService.requestConfirmation('Pipeline compiled', 'Your model compiled successfully! Do you want to run your pipeline?');
    if (redirect) {
      this._router.navigate(['/pipe-runner'], { queryParams: { pipeline: pipeline.id } });
      this._store.dispatch(setSelectedPipeline(pipeline.id));
    }
  }

  private _getLastActivities(connector: IConnector) {
    let incomingElements = [connector.source];
    while (incomingElements.length > 0 && incomingElements.every(element => element.type !== shapeTypes.Task)) {
      incomingElements = incomingElements.flatMap(element => element.incoming.map(incoming => incoming.source));
    }
    return incomingElements.filter(element => element.type === shapeTypes.Task);
  }

  private async _buildPipelineAction(index: number, pipeline: IPipeline, cursor: IElement): Promise<{ action: IPipelineAction, activityIdentifier: number }> {
    const identifier = generateGuid(),
      activityIdentifier: number = BPMNJsRepository.getSLPBExtension(cursor.businessObject, 'ActivityExtension', (ext => ext.activityFunctionId)),
      func = await selectSnapshot(this._store.select(selectFunction(activityIdentifier))),
      outputParam = typeof func?.output === 'number' ? await selectSnapshot(this._store.select(selectIParam(func.output))) : undefined,
      executableCode = func?.customImplementation ? func.customImplementation.join('\n') : func?.implementation;

    if(!func){
      throw('cannot find function');
    }

    const outgoingDataObjectReference = cursor.outgoing.find(connector => connector.type === shapeTypes.DataOutputAssociation)?.target;
    let isProvidingSolutionWrapper = false, isMatchingProcessOutput = false;
    if (outgoingDataObjectReference) {
      isMatchingProcessOutput = BPMNJsRepository.getSLPBExtension(outgoingDataObjectReference.businessObject, 'DataObjectExtension', (ext) => ext.matchesProcessOutputInterface);
      isProvidingSolutionWrapper = BPMNJsRepository.getSLPBExtension(outgoingDataObjectReference.businessObject, 'DataObjectExtension', (ext) => ext.isProcessOutput);
    }

    const action: IPipelineAction = {
      isPipelineStart: index === 0,
      identifier: identifier,
      pipeline: pipeline.id,
      name: func?.name,
      executableCode: executableCode,
      onSuccess: '',
      isProvidingPipelineOutput: isProvidingSolutionWrapper,
      outputMatchesPipelineOutput: isMatchingProcessOutput,
      ouputParamName: outputParam?.normalizedName,
      bpmnElementIdentifier: cursor.id,
      solutionReference: null
    };

    return { action, activityIdentifier };
  }

  public markAsUnchanged() {
    this._containsChanges.next(false);
  }

  public removeOutgoingDataObjectReferences(element: IElement) {
    const outgoingDataObjectReferences = element.outgoing.filter(outgoing => outgoing.type === shapeTypes.DataOutputAssociation);
    this.modelingModule.removeElements(outgoingDataObjectReferences.map(reference => reference.target));
  }

  public removeOutgoingGateways(element: IElement) {
    const outgoingDataObjectReferences = element.outgoing.filter(outgoing => outgoing.type === shapeTypes.SequenceFlow && (outgoing.target.type === shapeTypes.ExclusiveGateway || outgoing.target.type === shapeTypes.ParallelGateway));
    this.modelingModule.removeElements(outgoingDataObjectReferences.map(reference => reference.target));
  }

  public async saveCurrentBpmnModel(showHintAfterAction?: boolean | { successMessage: string }) {
    this._isSaving.next(true);
    const result: { xml: string } = await this._bpmnJs.saveXML();
    const viewbox = getCanvasModule(this._bpmnJs).viewbox();
    this._store.dispatch(updateCurrentIBpmnJSModel({ xml: result.xml, viewbox: viewbox }));

    this._containsChanges.next(false);
    this._isSaving.next(false);
    
    if (showHintAfterAction) {
      this._snackBar.open(typeof showHintAfterAction === 'object' && showHintAfterAction.successMessage ? showHintAfterAction.successMessage : 'model saved successfully', 'ok', { duration: 2000 });
    }
  }

  public undo = () => (window as any).cli.undo();
  public redo = () => (window as any).cli.redo();
  public zoomIn = () => this._bpmnJs.get('zoomScroll').stepZoom(1);
  public zoomOut = () => this._bpmnJs.get('zoomScroll').stepZoom(-1);

  private _setUp(): void {
    this.currentBpmnJSModel$.pipe(
      filter(bpmnJsModel => {
        this._bpmnJs.clear();
        return !!(bpmnJsModel?.xml);
      }),
      switchMap(bpmnJsModel => {
        return from(this._bpmnJs.importXML((bpmnJsModel as IBpmnJSModel).xml)).pipe(map(importResult => ({ importResult, bpmnJsModel })));
      }),
      delay(0)
    )
      .subscribe(args => {
        this.canvasModule.viewbox((args.bpmnJsModel as IBpmnJSModel).viewbox);
      });
    this.eventFired$.subscribe(event => {
      if (this.bpmnJsLoggingEnabled) {
        console.log(event);
      }
    });
    this.eventFired$.pipe(
      debounceTime(500),
      switchMap(() => combineLatest([this._bpmnJs.saveXML(), this._store.select(selectCurrentIBpmnJSModel)])),
      map(([currentValue, currentBpmnJsModel]) => {
        return currentValue?.xml != currentBpmnJsModel?.xml || !isEqual(this.canvasModule.viewbox(), currentBpmnJsModel.viewbox);
      })
    ).subscribe((isChanged) => {
      this._containsChanges.next(isChanged);
    });
  }

  public get canvasModule(): ICanvasModule {
    return getCanvasModule(this._bpmnJs);
  }

  public get directEditingModule(): IDirectEditingModule {
    return getDirectEditingModule(this._bpmnJs);
  }

  public get elementRegistryModule(): IElementRegistryModule {
    return getElementRegistryModule(this._bpmnJs);
  }

  public get eventBusModule() {
    return getEventBusModule(this._bpmnJs);
  }

  public get graphicsFactory() {
    return getGraphicsFactory(this._bpmnJs);
  }

  public get modelingModule(): IModelingModule {
    return getModelingModule(this._bpmnJs);
  }

  public get tooltipModule(): ITooltipModule {
    return getTooltipModule(this._bpmnJs);
  }

  public get zoomScrollModule(): IZoomScrollModule {
    return getZoomScrollModule(this._bpmnJs);
  }
}
