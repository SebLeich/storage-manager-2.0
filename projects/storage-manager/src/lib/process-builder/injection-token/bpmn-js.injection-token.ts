import { InjectionToken } from "@angular/core";
import { IBpmnJS } from "../interfaces/bpmn-js.interface";

export const BPMN_JS = new InjectionToken<IBpmnJS>('BPMN_JS');