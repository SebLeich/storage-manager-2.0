import { IEvent } from "../event.interface";

export interface IShapeAddedEvent extends IEvent {
    command: "shape.added";

}