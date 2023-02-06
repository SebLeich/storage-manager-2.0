import { Inject, Injectable } from '@angular/core';

// @ts-ignore
import * as BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js';

// @ts-ignore
import gridModule from "diagram-js/lib/features/grid-snapping/visuals";

// @ts-ignore
import CliModule from 'bpmn-js-cli';

// @ts-ignore
import * as tooltips from "diagram-js/lib/features/tooltips";

// @ts-ignore
import customBPMNJSModule from '../extensions/bpmn-js';

import { v4 as generateGuid } from 'uuid';

import { Subject, firstValueFrom } from 'rxjs';

import sebleichProcessBuilderExtension from '../globals/sebleich-process-builder-extension';
import { IBpmnJS } from '../interfaces/i-bpmn-js.interface';
import { getCanvasModule, getDirectEditingModule, getElementRegistryModule, getEventBusModule, getGraphicsFactory, getModelingModule, getTooltipModule, getZoomScrollModule, IElementRegistryModule, ITooltipModule } from 'src/lib/bpmn-io/bpmn-modules';
import { BehaviorSubject, buffer, combineLatest, debounceTime, delay, filter, from, map, merge, Observable, scan, shareReplay, startWith, switchMap, throttleTime, timer } from 'rxjs';
import { IConnectionCreatePostExecutedEvent } from 'src/lib/bpmn-io/interfaces/connection-create-post-executed-event.interface';
import { IModelingModule } from 'src/lib/bpmn-io/interfaces/modeling-module.interface';
import { IProcessValidationResult } from '../interfaces/validation-result.interface';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js.repository';
import { IZoomScrollModule } from 'src/lib/bpmn-io/interfaces/zoom-scroll-module.interface';
import { Store } from '@ngrx/store';
import { selectCurrentIBpmnJSModel, selectRecentlyUsedIBpmnJSModel } from '../store/selectors/bpmn-js-model.selectors';
import { IEvent } from 'src/lib/bpmn-io/interfaces/event.interface';
import { IDirectEditingEvent } from 'src/lib/bpmn-io/interfaces/direct-editing-event.interface';
import { IShapeDeleteExecutedEvent } from 'src/lib/bpmn-io/interfaces/shape-delete-executed-event.interface';
import { IShapeAddedEvent } from 'src/lib/bpmn-io/interfaces/shape-added-event.interface';
import { IViewboxChangedEvent } from '../interfaces/viewbox-changed-event.interface';
import { isEqual } from 'lodash';
import { addIBpmnJSModel, setCurrentIBpmnJSModel, updateCurrentIBpmnJSModel } from '../store/actions/bpmn-js-model.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { selectSnapshot } from '../globals/select-snapshot';
import defaultBpmnXmlConstant from '../globals/default-bpmn-xml.constant';
import moment from 'moment';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from '../globals/i-process-builder-config';
import { TaskCreationStep } from '../globals/task-creation-step';
import { IProcedure } from 'src/app/interfaces/i-procedure.interface';
import { TaskEditingStatus } from '../types/task-editing-status.type';
import shapeTypes from 'src/lib/bpmn-io/shape-types';
import { ICanvasModule } from 'src/lib/bpmn-io/interfaces/canvas-module.interface';
import { IDirectEditingModule } from 'src/lib/bpmn-io/interfaces/direct-editing-module.interface';
import { IElement } from 'src/lib/bpmn-io/interfaces/element.interface';
import { IPipeline } from 'src/lib/pipeline-store/interfaces/pipeline.interface';
import { selectIFunction } from '../store/selectors/function.selector';
import { IConnector } from 'src/lib/bpmn-io/interfaces/connector.interface';
import { IPipelineAction } from 'src/lib/pipeline-store/interfaces/pipeline-action.interface';
import { ConfirmationService } from 'src/lib/confirmation/services/confirmation.service';
import { Router } from '@angular/router';
import { addIPipeline, removeIPipeline } from 'src/lib/pipeline-store/store/actions/pipeline.actions';
import { addIPipelineActions } from 'src/lib/pipeline-store/store/actions/pipeline-action.actions';
import { selectPipelineByBpmnJsModel } from 'src/lib/pipeline-store/store/selectors/pipeline.selectors';
import { IShapeCreateEvent } from 'src/lib/bpmn-io/interfaces/shape-create-event.interface';
import { selectIParam } from '../store/selectors/param.selectors';

@Injectable()
export class BpmnJsService {

  public bpmnJs: IBpmnJS = new BpmnJS({
    additionalModules: [
      customBPMNJSModule,
      gridModule,
      CliModule,
      tooltips
    ],
    cli: {
      bindTo: 'cli'
    },
    moddleExtensions: {
      processBuilderExtension: sebleichProcessBuilderExtension
    }
  });

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
      filter(event => {
        return event.context.source.type === shapeTypes.ExclusiveGateway
          && BPMNJsRepository.sLPBExtensionSetted(event.context.source.businessObject, 'GatewayExtension', (ext) => ext.gatewayType === 'error_gateway');
      }),
      map(event => {
        return {
          taskCreationStep: TaskCreationStep.ConfigureErrorGatewayEntranceConnection,
          element: event.context.connection
        }
      })
    ),
  );

  public dataObjectReferenceEditingEventFired$ = merge(
    this.directEditingEventFired$.pipe(
      filter(event => event?.active?.element?.type === shapeTypes.DataObjectReference)
    )
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
    map(() => BPMNJsRepository.validateProcess(this.bpmnJs)),
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
  ).pipe(
    startWith('idle' as TaskEditingStatus)
  );

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

  constructor(@Inject(PROCESS_BUILDER_CONFIG_TOKEN) private _config: IProcessBuilderConfig, private _store: Store, private _snackBar: MatSnackBar, private _confirmationService: ConfirmationService, private _router: Router) {
    this._setUp();
  }

  public async attachBpmnModelToDomElement(parent: HTMLDivElement) {
    this.bpmnJs.attachTo(parent);
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
      this._store.dispatch(removeIPipeline(existingPipeline));
    }

    const startEvent = BPMNJsRepository.getStartEvents(this.elementRegistryModule)[0];
    let cursor: IElement | null = startEvent.outgoing[0].target,
      pipeline: IPipeline = { bpmnJsModelReference: bpmnJsModelIdentifier, name: name, solutionReference: null },
      pipelineActions = [];

    let anchestor: IPipelineAction | null = null, index = 0;
    while (cursor) {
      const activityIdentifier: number = BPMNJsRepository.getSLPBExtension(cursor.businessObject, 'ActivityExtension', (ext => ext.activityFunctionId));
      const func = await selectSnapshot(this._store.select(selectIFunction(activityIdentifier)));
      const outputParam = typeof func?.output?.param === 'number'? await selectSnapshot(this._store.select(selectIParam(func.output.param))): undefined;
      const executableCode = func?.customImplementation ? eval(func!.customImplementation.join('\n')!) : func?.implementation;
      const identifier = generateGuid();

      switch (cursor.type) {
        case shapeTypes.Task:
          if (anchestor) {
            (anchestor as IPipelineAction).onSuccess = identifier;
          }
          const outgoingDataObjectReference = cursor.outgoing.find(connector => connector.type === shapeTypes.DataOutputAssociation)?.target;
          let isProvidingSolutionWrapper = false;
          if(outgoingDataObjectReference){
            isProvidingSolutionWrapper = BPMNJsRepository.getSLPBExtension(outgoingDataObjectReference.businessObject, 'DataObjectExtension', (ext) => ext.isProcessOutput);
          }

          anchestor = {
            isPipelineStart: index === 0,
            identifier: identifier,
            pipeline: pipeline.name,
            name: func!.name,
            executableCode: executableCode,
            onSuccess: '',
            isProvidingPipelineOutput: isProvidingSolutionWrapper,
            ouputParamName: outputParam?.normalizedName
          };
          pipelineActions.push(anchestor);

          const successorPointer: IConnector = cursor.outgoing.find(outgoing => outgoing.type === shapeTypes.SequenceFlow) as IConnector;
          cursor = successorPointer!.target;
          break;

        case shapeTypes.ExclusiveGateway:
          debugger;

        default:
          cursor = null;
          break;
      }

      index++;
    }

    this._store.dispatch(addIPipeline(pipeline));
    this._store.dispatch(addIPipelineActions(pipelineActions));
    const redirect = await this._confirmationService.requestConfirmation('Pipeline compiled', 'Your model compiled successfully! Do you want to run your pipeline?');
    if (redirect) {
      this._router.navigate(['/pipe-runner'], { queryParams: { pipeline: pipeline.name } });
    }
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
    await selectSnapshot(timer(0));
    const result: { xml: string } = await this.bpmnJs.saveXML();
    const viewbox = getCanvasModule(this.bpmnJs).viewbox();
    this._store.dispatch(updateCurrentIBpmnJSModel({ xml: result.xml, viewbox: viewbox }));
    this._containsChanges.next(false);
    this._isSaving.next(false);
    if (showHintAfterAction) {
      this._snackBar.open(typeof showHintAfterAction === 'object' && showHintAfterAction.successMessage ? showHintAfterAction.successMessage : 'model saved successfully', 'ok', { duration: 2000 });
    }
  }

  public undo = () => (window as any).cli.undo();
  public redo = () => (window as any).cli.redo();
  public zoomIn = () => this.bpmnJs.get('zoomScroll').stepZoom(1);
  public zoomOut = () => this.bpmnJs.get('zoomScroll').stepZoom(-1);

  private _setUp(): void {
    this.currentBpmnJSModel$.pipe(
      filter(bpmnJsModel => {
        this.bpmnJs.clear();
        return !!(bpmnJsModel?.xml);
      }),
      switchMap(bpmnJsModel => {
        return from(this.bpmnJs.importXML(bpmnJsModel!.xml)).pipe(map(importResult => ({ importResult, bpmnJsModel })));
      }),
      delay(0)
    )
      .subscribe(args => {
        this.canvasModule.viewbox(args.bpmnJsModel!.viewbox);
      });
    this.eventFired$.subscribe(event => {
      if (this.bpmnJsLoggingEnabled) {
        console.log(event);
      }
    });
    this.eventFired$.pipe(
      debounceTime(500),
      switchMap(() => combineLatest([this.bpmnJs.saveXML(), this._store.select(selectCurrentIBpmnJSModel)])),
      map(([currentValue, currentBpmnJsModel]) => {
        return currentValue?.xml != currentBpmnJsModel?.xml || !isEqual(this.canvasModule.viewbox(), currentBpmnJsModel.viewbox);
      })
    ).subscribe((isChanged) => {
      this._containsChanges.next(isChanged);
    });

    BpmnJsService.elementDeletionRequested$.subscribe(element => console.log(element));
  }

  public get canvasModule(): ICanvasModule {
    return getCanvasModule(this.bpmnJs);
  }

  public get directEditingModule(): IDirectEditingModule {
    return getDirectEditingModule(this.bpmnJs);
  }

  public get elementRegistryModule(): IElementRegistryModule {
    return getElementRegistryModule(this.bpmnJs);
  }

  public get eventBusModule() {
    return getEventBusModule(this.bpmnJs);
  }

  public get graphicsFactory(){
    return getGraphicsFactory(this.bpmnJs);
  }

  public get modelingModule(): IModelingModule {
    return getModelingModule(this.bpmnJs);
  }

  public get tooltipModule(): ITooltipModule {
    return getTooltipModule(this.bpmnJs);
  }

  public get zoomScrollModule(): IZoomScrollModule {
    return getZoomScrollModule(this.bpmnJs);
  }
}
