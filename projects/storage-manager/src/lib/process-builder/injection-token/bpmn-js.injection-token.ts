import { InjectionToken } from "@angular/core"
import { IBpmnJS } from "../interfaces/bpmn-js.interface"

const token = new InjectionToken<IBpmnJS>('BPMN_JS');
export default token;