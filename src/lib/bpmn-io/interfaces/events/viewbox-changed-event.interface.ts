import { IViewbox } from "src/lib/bpmn-io/interfaces/viewbox.interface";

export interface IViewboxChangedEvent {
    type: unknown;
    viewbox: IViewbox;
}