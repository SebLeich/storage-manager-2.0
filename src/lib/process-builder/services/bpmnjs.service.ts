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
import { map, merge, Observable, shareReplay, throttleTime } from 'rxjs';
import { IDirectEditingEvent } from 'src/lib/bpmn-io/i-direct-editing-event';
import { IShapeAddedEvent } from 'src/lib/bpmn-io/i-shape-added-event.interface';
import { IEvent } from 'src/lib/bpmn-io/i-event';
import { IShapeDeleteExecutedEvent } from 'src/lib/bpmn-io/i-shape-delete-executed-event';
import { IConnectionCreatePostExecutedEvent } from 'src/lib/bpmn-io/i-connection-create-post-executed-event';
import { IModelingModule } from 'src/lib/bpmn-io/interfaces/i-modeling-module.interface';
import { IProcessValidationResult } from '../classes/validation-result';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js.repository';
import { IZoomScrollModule } from 'src/lib/bpmn-io/interfaces/i-zoom-scroll-module.interface';


@Injectable()
export class BpmnJsService {

  public bpmnjs: IBpmnJS = new BpmnJS({
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

  public eventFired$ = merge(
    this.attachEventFired$.pipe(map(event => ({ event: event, type: 'attach' }))),
    this.connectionCreatePostExecutedEventFired$.pipe(map(event => ({ event: event, type: 'commandStack.connection.create.postExecuted' }))),
    this.detachEventFired$.pipe(map(event => ({ event: event, type: 'detach' }))),
    this.directEditingEventFired$.pipe(map(event => ({ event: event, type: 'directEditing.activate' }))),
    this.shapeAddedEventFired$.pipe(map(event => ({ event: event, type: 'shape.added' }))),
    this.shapeDeleteExecutedEventFired$.pipe(map(event => ({ event: event, type: 'commandStack.shape.delete.executed' }))),
    this.shapeRemoveEventFired$.pipe(map(event => ({ event: event, type: 'shape.remove' }))),
    this.toolManagerUpdateEventFired$.pipe(map(event => ({ event: event, type: 'tool-manager.update' }))),
  );

  public validation$: Observable<undefined | null | IProcessValidationResult> = this.eventFired$.pipe(
    throttleTime(500),
    map(() => BPMNJsRepository.validateProcess(this.bpmnjs)),
    shareReplay(1)
  );

  constructor() {
    this.eventFired$.subscribe((arg: any) => console.log(arg));
  }

  public get canvasModule() {
    return getCanvasModule(this.bpmnjs);
  }

  public get directEditingModule() {
    return getDirectEditingModule(this.bpmnjs);
  }

  public get elementRegistryModule() {
    return getElementRegistryModule(this.bpmnjs);
  }

  public get eventBusModule() {
    return getEventBusModule(this.bpmnjs);
  }

  public get modelingModule(): IModelingModule {
    return getModelingModule(this.bpmnjs);
  }

  public get tooltipModule() {
    return getTooltipModule(this.bpmnjs);
  }

  public get zoomScrollModule(): IZoomScrollModule {
    return getZoomScrollModule(this.bpmnjs);
  }
}
