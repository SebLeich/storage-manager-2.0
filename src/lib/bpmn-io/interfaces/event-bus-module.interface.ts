import { BpmnJsEventType } from "../bpmn-js-event-types";

export interface IEventBusModule {
    on: (event: BpmnJsEventType, callback: (evt: any) => any) => void;
}