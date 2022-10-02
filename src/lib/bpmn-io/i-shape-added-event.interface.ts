import { IEvent } from "./i-event";

export interface IShapeAddedEvent extends IEvent {
    command: "shape.added";

}