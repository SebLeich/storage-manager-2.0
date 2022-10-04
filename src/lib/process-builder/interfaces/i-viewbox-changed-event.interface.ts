import { IViewbox } from "src/lib/bpmn-io/interfaces/i-viewbox.interface";

export interface IViewboxChangedEvent {
    type: any;
    viewbox: IViewbox;
}