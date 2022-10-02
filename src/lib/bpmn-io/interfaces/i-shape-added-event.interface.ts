import { IEvent } from "./i-event.interface";

export interface IShapeAddedEvent extends IEvent {
    command: "shape.added";

}