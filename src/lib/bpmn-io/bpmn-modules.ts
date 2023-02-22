import { IBpmnJS } from "../process-builder/interfaces/bpmn-js.interface";
import bpmnJsModules from "./bpmn-js-modules";
import { IElement } from "./interfaces/element.interface";
import { IModelingModule } from "./interfaces/modeling-module.interface";
import { IZoomScrollModule } from "./interfaces/zoom-scroll-module.interface";
import { ICanvasModule } from "./interfaces/canvas-module.interface";
import { IEventBusModule } from "./interfaces/event-bus-module.interface";
import { IDirectEditingModule } from "./interfaces/direct-editing-module.interface";
import { IGraphicsFactory } from "./interfaces/graphics-factory.interface";
import { IConnector } from "./interfaces/connector.interface";

export const getCanvasModule = (bpmnJS: IBpmnJS) => bpmnJS.get(bpmnJsModules.Canvas) as ICanvasModule;
export const getDirectEditingModule = (bpmnJS: IBpmnJS) => bpmnJS.get(bpmnJsModules.DirectEditing) as IDirectEditingModule;
export const getModelingModule = (bpmnJS: IBpmnJS) => bpmnJS.get(bpmnJsModules.Modeling) as IModelingModule;
export const getGraphicsFactory = (bpmnJS: IBpmnJS) => bpmnJS.get(bpmnJsModules.GraphicsFactory) as IGraphicsFactory;
export const getElementRegistryModule = (bpmnJS: IBpmnJS) => bpmnJS.get(bpmnJsModules.ElementRegistry) as IElementRegistryModule;
export const getEventBusModule = (bpmnJS: IBpmnJS) => bpmnJS.get(bpmnJsModules.EventBus) as IEventBusModule;
export const getTooltipModule = (bpmnJS: IBpmnJS) => bpmnJS.get(bpmnJsModules.Tooltip) as ITooltipModule;
export const getZoomScrollModule = (bpmnJS: IBpmnJS) => bpmnJS.get(bpmnJsModules.ZoomScroll) as IZoomScrollModule;

export interface ITooltipModule {
    add: (data: { position: { x: number, y: number }, html: string }) => void;
    hide: () => void;
    remove: (data: any) => void;
    show: () => void;
    _tooltips: { [key: string]: object };
}

export interface IElementRegistryModule {
    add: (element: IElement) => void;
    filter: (cond: (e: IElement) => boolean) => IElement[];
    find: (cond: (e: IElement) => boolean) => IElement | undefined;
    forEach: (arg: (e: IElement) => void) => void;
    get: (id: string) => IElement | IConnector | undefined;
    getAll: () => IElement[];
    remove: (element: IElement) => void;
    updateId: (element: IElement, id: string) => void;
    /*
    getGraphics: ƒ (e, t)
    updateGraphics: ƒ (e, t, n)
    */
}
