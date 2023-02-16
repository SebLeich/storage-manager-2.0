import { IElement } from 'src/lib/bpmn-io/interfaces/element.interface';
import shapeTypes from 'src/lib/bpmn-io/shape-types';
import { BpmnJsService } from 'src/lib/process-builder/services/bpmn-js.service';
import { ContextPadEntryTypes } from './context-pad-entry.type';
import { IContextPadEntry } from './context-pad-entry.interface';
import { IAutoPlace } from '../interfaces/auto-place.interface';

export default class CustomContextPad {
  public static $inject = [
    "autoPlace",
    "contextPad",
    "create",
    "elementFactory",
    "connect"
  ];
  constructor(public autoPlace: IAutoPlace, public contextPad: any, public create: any, public elementFactory: any, public connect: any) {
    contextPad.registerProvider(this);
  }

  public getContextPadEntries(element: IElement): (entries: any) => { [key in ContextPadEntryTypes]?: IContextPadEntry } {
    let contextPad: { [key in ContextPadEntryTypes]?: IContextPadEntry } = {};
    this._addDeleteAction(contextPad, element);

    switch (element.type) {
      case shapeTypes.Task:
        this._addAddEndEventAction(contextPad, element);
        this._addAppendTaskAction(contextPad, element, this.elementFactory, this.create, this.autoPlace);
        this._addConnectAction(contextPad, element, this.connect);
        this._addAddExclusiveGatewayAction(contextPad, element, this.elementFactory, this.create, this.autoPlace);
        break;

      case shapeTypes.ExclusiveGateway:
        this._addConnectAction(contextPad, element, this.connect);
        this._addAppendTaskAction(contextPad, element, this.elementFactory, this.create, this.autoPlace);
        break;

      case shapeTypes.StartEvent:
        this._addConnectAction(contextPad, element, this.connect);
        this._addAppendTaskAction(contextPad, element, this.elementFactory, this.create, this.autoPlace);
        break;

    }
    return (entries: any) => contextPad;
  }

  private _addAppendTaskAction(contextPad: { [key in ContextPadEntryTypes]?: IContextPadEntry }, element: IElement, elementFactory: any, create: any, autoPlace: any) {
    contextPad['append.append-task'] = {
      group: "model",
      className: 'bpmn-icon-task',
      title: "Append Task",
      action: {
        click: () => {
          const shape = elementFactory.createShape({ type: shapeTypes.Task });
          autoPlace.append(element, shape);
        }
      }
    }
  }

  private _addAddEndEventAction(contextPad: { [key in ContextPadEntryTypes]?: IContextPadEntry }, element: IElement) {
    contextPad['append.end-event'] = {
      group: "model",
      className: "bpmn-icon-end-event-none",
      title: "Append End Event",
      action: {
        click: () => {
          BpmnJsService.elementEndEventCreationRequested.next(element)
        }
      }
    }
  }

  private _addConnectAction(contextPad: { [key in ContextPadEntryTypes]?: IContextPadEntry }, element: IElement, connect: any, autoActivate: boolean = false) {
    contextPad['connect'] = {
      group: 'edit',
      className: 'bpmn-icon-connection-multi',
      title: 'Connect',
      action: {
        click: (event) => {
          connect.start(event, element, autoActivate);
        }
      }
    }
  }

  private _addDeleteAction(contextPad: { [key in ContextPadEntryTypes]?: IContextPadEntry }, element: IElement) {
    contextPad['delete'] = {
      group: "edit",
      className: "bpmn-icon-trash",
      title: "Remove",
      action: {
        click: () => {
          console.log(element);
          BpmnJsService.elementDeletionRequested$.next(element);
        },
      },
    }
  }

  private _addAddExclusiveGatewayAction(contextPad: { [key in ContextPadEntryTypes]?: IContextPadEntry }, element: IElement, elementFactory: any, create: any, autoPlace: any) {
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
