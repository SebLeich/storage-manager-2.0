import { IBpmnJS } from "../process-builder/interfaces/bpmn-js.interface";
import bpmnJsModules from "./bpmn-js-modules";
import { ICanvasModule, IDirectEditingModule, IElementRegistryModule, IGraphicsFactory, IEventBusModule, IModelingModule, ITooltipModule, IZoomScrollModule } from "@bpmn-io/modules";

export const getCanvasModule = (bpmnJS: IBpmnJS) => bpmnJS.get(bpmnJsModules.Canvas) as ICanvasModule;
export const getDirectEditingModule = (bpmnJS: IBpmnJS) => bpmnJS.get(bpmnJsModules.DirectEditing) as IDirectEditingModule;
export const getModelingModule = (bpmnJS: IBpmnJS) => bpmnJS.get(bpmnJsModules.Modeling) as IModelingModule;
export const getGraphicsFactory = (bpmnJS: IBpmnJS) => bpmnJS.get(bpmnJsModules.GraphicsFactory) as IGraphicsFactory;
export const getElementRegistryModule = (bpmnJS: IBpmnJS) => bpmnJS.get(bpmnJsModules.ElementRegistry) as IElementRegistryModule;
export const getEventBusModule = (bpmnJS: IBpmnJS) => bpmnJS.get(bpmnJsModules.EventBus) as IEventBusModule;
export const getTooltipModule = (bpmnJS: IBpmnJS) => bpmnJS.get(bpmnJsModules.Tooltip) as ITooltipModule;
export const getZoomScrollModule = (bpmnJS: IBpmnJS) => bpmnJS.get(bpmnJsModules.ZoomScroll) as IZoomScrollModule;
