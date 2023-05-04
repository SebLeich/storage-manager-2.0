import { filter, Observable } from "rxjs";
import shapeTypes from "./shape-types";
import { IEvent } from "./interfaces/event.interface";

export const endEventFilter = (source: Observable<IEvent>) => source.pipe(filter(x => x.element.type === shapeTypes.EndEvent));
export const exclusiveGatewayFilter = (source: Observable<IEvent>) => source.pipe(filter(x => x.element.type === shapeTypes.ExclusiveGateway));
export const parallelGatewayFilter = (source: Observable<IEvent>) => source.pipe(filter(x => x.element.type === shapeTypes.ParallelGateway));
export const startEventFilter = (source: Observable<IEvent>) => source.pipe(filter(x => x.element.type === shapeTypes.StartEvent));
export const taskFilter = (source: Observable<IEvent>) => source.pipe(filter(x => x.element.type === shapeTypes.Task));
export const textAnnotationFilter = (source: Observable<IEvent>) => source.pipe(filter(x => x.element.type === shapeTypes.TextAnnotation));
