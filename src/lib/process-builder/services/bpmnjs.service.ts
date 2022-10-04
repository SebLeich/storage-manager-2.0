import { Injectable } from '@angular/core';

// @ts-ignore
import * as BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js';

// @ts-ignore
import gridModule from "diagram-js/lib/features/grid-snapping/visuals";

// @ts-ignore
import CliModule from 'bpmn-js-cli';

// @ts-ignore
import * as tooltips from "diagram-js/lib/features/tooltips";

// @ts-ignore
import customRendererModule from '../extensions/custom-renderer';

import sebleichProcessBuilderExtension from '../globals/sebleich-process-builder-extension';
import { IBpmnJS } from '../interfaces/i-bpmn-js.interface';
import { getCanvasModule, getDirectEditingModule, getElementRegistryModule, getEventBusModule, getModelingModule, getTooltipModule, getZoomScrollModule } from 'src/lib/bpmn-io/bpmn-modules';
import { BehaviorSubject, combineLatest, debounceTime, delay, filter, from, map, merge, Observable, shareReplay, switchMap, throttleTime, timer } from 'rxjs';
import { IConnectionCreatePostExecutedEvent } from 'src/lib/bpmn-io/interfaces/i-connection-create-post-executed-event.interface';
import { IModelingModule } from 'src/lib/bpmn-io/interfaces/i-modeling-module.interface';
import { IProcessValidationResult } from '../classes/validation-result';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js.repository';
import { IZoomScrollModule } from 'src/lib/bpmn-io/interfaces/i-zoom-scroll-module.interface';
import { Store } from '@ngrx/store';
import { selectCurrentIBpmnJSModel } from '../store/selectors/i-bpmn-js-model.selectors';
import { IEvent } from 'src/lib/bpmn-io/interfaces/i-event.interface';
import { IDirectEditingEvent } from 'src/lib/bpmn-io/interfaces/i-direct-editing-event.interface';
import { IShapeDeleteExecutedEvent } from 'src/lib/bpmn-io/interfaces/i-shape-delete-executed-event.interface';
import { IShapeAddedEvent } from 'src/lib/bpmn-io/interfaces/i-shape-added-event.interface';
import { IViewboxChangedEvent } from '../interfaces/i-viewbox-changed-event.interface';
import { isEqual } from 'lodash';
import { updateCurrentIBpmnJSModel } from '../store/actions/i-bpmn-js-model.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { selectSnapshot } from '../globals/select-snapshot';


@Injectable()
export class BpmnJsService {

  public bpmnJs: IBpmnJS = new BpmnJS({
    additionalModules: [
      customRendererModule,
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

  public shapeAddedEventFired$ = new Observable<IShapeAddedEvent>((subscriber) => this.eventBusModule.on('shape.added', (evt) => {
    subscriber.next(evt);
  }));

  public shapeRemoveEventFired$ = new Observable<IEvent>((subscriber) => this.eventBusModule.on('shape.remove', (evt) => {
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
    this.shapeAddedEventFired$.pipe(map(event => ({ event: event, type: 'shape.added' }))),
    this.shapeDeleteExecutedEventFired$.pipe(map(event => ({ event: event, type: 'commandStack.shape.delete.executed' }))),
    this.shapeRemoveEventFired$.pipe(map(event => ({ event: event, type: 'shape.remove' }))),
    this.toolManagerUpdateEventFired$.pipe(map(event => ({ event: event, type: 'tool-manager.update' }))),
    this.viewboxChangedEventFired$.pipe(map(event => ({ event: event, type: 'canvas.viewbox.changed' }))),
  );

  public validation$: Observable<undefined | null | IProcessValidationResult> = this.eventFired$.pipe(
    throttleTime(500),
    map(() => BPMNJsRepository.validateProcess(this.bpmnJs)),
    shareReplay(1),
    delay(0)
  );
  public validationContainsErrors$ = this.validation$.pipe(
    map(validation => (validation?.errors?.length ?? 0) > 0)
  );
  public bpmnJsLoggingEnabled = false;

  private currentBpmnJSModel$ = this._store.select(selectCurrentIBpmnJSModel);

  private _containsChanges = new BehaviorSubject<boolean>(false);
  public containsChanges$ = this._containsChanges.asObservable();

  private _isSaving = new BehaviorSubject<boolean>(false);
  public isSaving$ = this._isSaving.asObservable();

  constructor(private _store: Store, private _snackBar: MatSnackBar) {
    this._setUp();
  }

  public markAsUnchanged() {
    this._containsChanges.next(false);
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

  private _setUp(): void {
    this.currentBpmnJSModel$.pipe(
      filter(bpmnJsModel => !!bpmnJsModel),
      switchMap(bpmnJsModel => {
        this.bpmnJs.clear();
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
  }

  public get canvasModule() {
    return getCanvasModule(this.bpmnJs);
  }

  public get directEditingModule() {
    return getDirectEditingModule(this.bpmnJs);
  }

  public get elementRegistryModule() {
    return getElementRegistryModule(this.bpmnJs);
  }

  public get eventBusModule() {
    return getEventBusModule(this.bpmnJs);
  }

  public get modelingModule(): IModelingModule {
    return getModelingModule(this.bpmnJs);
  }

  public get tooltipModule() {
    return getTooltipModule(this.bpmnJs);
  }

  public get zoomScrollModule(): IZoomScrollModule {
    return getZoomScrollModule(this.bpmnJs);
  }
}
