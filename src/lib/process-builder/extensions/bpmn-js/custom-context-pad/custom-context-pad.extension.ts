import { IElement } from 'src/lib/bpmn-io/interfaces/element.interface';
import shapeTypes from 'src/lib/bpmn-io/shape-types';
import { BpmnJsService } from 'src/lib/process-builder/services/bpmn-js.service';
import { ContextPadEntryTypes } from './context-pad-entry.types';
import { IContextPadEntry } from './context-pad-entry.interface';
import { IAutoPlace } from './auto-place.interface';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js.repository';

export default class CustomContextPad {
  public create: any;
  public elementFactory: any;
  public translate: any;
  public autoPlace!: IAutoPlace;
  public static $inject: any;
  public nonExisting = ['append.intermediate-event', 'replace'];
  constructor(config: any, contextPad: any, create: any, elementFactory: any, injector: any, translate: any) {
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    if (config.autoPlace !== false) {
      this.autoPlace = injector.get("autoPlace", false);
    }

    contextPad.registerProvider(this);
  }

  public getContextPadEntries(element: IElement): (entries: any) => { [key in ContextPadEntryTypes]?: IContextPadEntry } {
    const { autoPlace, create, elementFactory, translate } = this;
    let contextPad: { [key in ContextPadEntryTypes]?: IContextPadEntry } = {};
    switch (element.type) {
      case shapeTypes.Task:
        this._addAddEndEventAction(contextPad, element, translate);
        this._addAppendTaskAction(contextPad, element, translate, elementFactory, create, autoPlace);
        this._addDeleteAction(contextPad, element, translate);
        this._addAddExclusiveGatewayAction(contextPad, element, translate, elementFactory, create, autoPlace);
        break;
      case shapeTypes.EndEvent:
        this._addAppendTaskAction(contextPad, element, translate, elementFactory, create, autoPlace);
        this._addDeleteAction(contextPad, element, translate);
        break;
      case shapeTypes.ExclusiveGateway:
        this._addAppendTaskAction(contextPad, element, translate, elementFactory, create, autoPlace);
        this._addDeleteAction(contextPad, element, translate);
        break;
      case shapeTypes.StartEvent:
        this._addAppendTaskAction(contextPad, element, translate, elementFactory, create, autoPlace);
        this._addDeleteAction(contextPad, element, translate);
        break;
    }
    return (entries: any) => contextPad;
  }

  private _addAppendTaskAction(contextPad: { [key in ContextPadEntryTypes]?: IContextPadEntry }, element: IElement, translate: (toTranslate: string) => string, elementFactory: any, create: any, autoPlace: any) {
    contextPad['append.append-task'] = {
      group: "model",
      className: 'bpmn-icon-task',
      title: translate("Append Activity") as string,
      action: {
        click: () => {
          const shape = elementFactory.createShape({ type: shapeTypes.Task });
          autoPlace.append(element, shape);
        }
      }
    }
  }

  private _addAddEndEventAction(contextPad: { [key in ContextPadEntryTypes]?: IContextPadEntry }, element: IElement, translate: (toTranslate: string) => string) {
    contextPad['append.end-event'] = {
      group: "model",
      className: "bpmn-icon-end-event-none",
      title: translate("Append EndEvent") as string,
      action: {
        click: () => {
          BpmnJsService.elementEndEventCreationRequested.next(element)
        }
      }
    }
  }

  private _addDeleteAction(contextPad: { [key in ContextPadEntryTypes]?: IContextPadEntry }, element: IElement, translate: (toTranslate: string) => string) {
    contextPad['delete'] = {
      group: "edit",
      className: "bpmn-icon-trash",
      title: translate("Remove") as string,
      action: {
        click: () => {
          console.log(element);
          BpmnJsService.elementDeletionRequested$.next(element);
        },
      },
    }
  }

  private _addAddExclusiveGatewayAction(contextPad: { [key in ContextPadEntryTypes]?: IContextPadEntry }, element: IElement, translate: (toTranslate: string) => string, elementFactory: any, create: any, autoPlace: any) {
    contextPad['append.exclusive-gateway'] = {
      group: "model",
      className: 'bpmn-icon-gateway-xor',
      title: "Append an exclusive gateway",
      action: {
        click: () => {
          const shape = elementFactory.createShape({ type: shapeTypes.ExclusiveGateway });
          autoPlace.append(element, shape);
        }
      }
    }
  }
}

CustomContextPad.$inject = [
  "config",
  "contextPad",
  "create",
  "elementFactory",
  "injector",
  "translate",
];
