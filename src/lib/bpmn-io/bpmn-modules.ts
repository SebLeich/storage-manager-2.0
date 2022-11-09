import { IBpmnJS } from "../process-builder/interfaces/i-bpmn-js.interface";
import bpmnJsModules from "./bpmn-js-modules";
import { IElement } from "./interfaces/i-element.interface";
import { BpmnJsEventType } from "./bpmn-js-event-types";
import { IModelingModule } from "./interfaces/i-modeling-module.interface";
import { IZoomScrollModule } from "./interfaces/i-zoom-scroll-module.interface";
import { ICanvasModule } from "./interfaces/canvas-module.interface";

export const getCanvasModule = (bpmnJS: IBpmnJS) => bpmnJS.get(bpmnJsModules.Canvas) as ICanvasModule;
export const getDirectEditingModule = (bpmnJS: IBpmnJS) => bpmnJS.get(bpmnJsModules.DirectEditing) as IDirectEditingModule;
export const getModelingModule = (bpmnJS: IBpmnJS) => bpmnJS.get(bpmnJsModules.Modeling) as IModelingModule;
export const getElementRegistryModule = (bpmnJS: IBpmnJS) => bpmnJS.get(bpmnJsModules.ElementRegistry) as IElementRegistryModule;
export const getEventBusModule = (bpmnJS: IBpmnJS) => bpmnJS.get(bpmnJsModules.EventBus) as IEventBusModule;
export const getTooltipModule = (bpmnJS: IBpmnJS) => bpmnJS.get(bpmnJsModules.Tooltip) as ITooltipModule;
export const getZoomScrollModule = (bpmnJS: IBpmnJS) => bpmnJS.get(bpmnJsModules.ZoomScroll) as IZoomScrollModule;

export interface IDirectEditingModule {
    $textbox?: HTMLDivElement;
    activate: () => void;
    cancel: () => void;
    complete: () => void;
    getValue: () => string;
    isActive: () => boolean;
    registerProvider: (provider: any) => void;
}

export interface ITooltipModule {
    add: (data: { position: { x: number, y: number }, html: string }) => void;
    hide: () => void;
    remove: (data: any) => void;
    show: () => void;
    _tooltips: { [key: string]: object };
}

export interface IEventBusModule {
    on: (event: BpmnJsEventType, callback: (evt: any) => any) => void;
}

export interface IElementRegistryModule {
    add: (element: IElement) => void;
    filter: (cond: (e: IElement) => boolean) => IElement[];
    find: (cond: (e: IElement) => boolean) => IElement | undefined;
    forEach: (arg: (e: IElement) => void) => void;
    get: (id: string) => IElement | undefined;
    getAll: () => IElement[];
    /*
    getGraphics: ƒ (e, t)
    remove: ƒ (e)
    updateGraphics: ƒ (e, t, n)
    updateId: ƒ (e, t)
    */
}
