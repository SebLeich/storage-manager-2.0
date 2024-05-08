import { BpmnJsEventType } from "../../bpmn-js-event-types";
import { IElement } from "../element.interface";

export interface IEventBusModule {
    fire: (event: BpmnJsEventType, element: IElement) => void;
    on: (event: BpmnJsEventType, callback: (evt: any) => any) => void;
}