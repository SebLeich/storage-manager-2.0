import { IBpmnJS } from "../process-builder/globals/i-bpmn-js";
import bpmnJsModules from "./bpmn-js-modules";
import { IConnector } from "./i-connector";
import { IElement } from "./i-element";
import { IViewbox } from "./i-viewbox";

export const getCanvasModule = (bpmnJS: IBpmnJS) => bpmnJS.get(bpmnJsModules.Canvas) as ICanvasModule;
export const getModelingModule = (bpmnJS: IBpmnJS) => bpmnJS.get(bpmnJsModules.Modeling) as IModelingModule;
export const getElementRegistryModule = (bpmnJS: IBpmnJS) => bpmnJS.get(bpmnJsModules.ElementRegistry) as IElementRegistry;
export const getEventBusModule = (bpmnJS: IBpmnJS) => bpmnJS.get(bpmnJsModules.EventBus) as IEventBus;
export const getTooltipModule = (bpmnJS: IBpmnJS) => bpmnJS.get(bpmnJsModules.Tooltip) as ITooltipModule;

export interface ICanvasModule {
    viewbox: (viewbox?: IViewbox) => IViewbox;
    zoom(viewbox: 'fit-viewport', focus?: 'auto'): void;
}

export interface ITooltipModule {
    add: (data: { position: { x: number, y: number }, html: string }) => void;
    hide: () => void;
    remove: (data: any) => void;
    show: () => void;
    _tooltips: { [key: string]: object };
}

export interface IEventBus {
    on: (event: any, callback: (evt: any) => any) => void;
}

export interface IModelingModule {
    appendShape: (origin: IElement, type: { type: string, data?: any }, position: null | { x: number, y: number }) => IElement;
    connect: (origin: IElement, target: IElement) => IConnector;
    removeElements: (elements: IElement[] | IConnector[]) => void;
    updateLabel: (element: IElement | IConnector, text: string) => void;
    updateProperties: (element: IElement | IConnector, data: any) => void;
}

export interface IElementRegistry {
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
