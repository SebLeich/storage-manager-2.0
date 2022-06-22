import { IBpmnJS } from "../process-builder/globals/i-bpmn-js";
import { ValidationErrorPipe } from "../process-builder/pipes/validation-error.pipe";
import { BPMNJsRepository } from "./bpmn-js-repository";

export const processPerformer = (bpmnJS: IBpmnJS) => {

    let validation = BPMNJsRepository.validateProcess(bpmnJS);

    if (validation.errors.length > 0) {
        throw (`errors: ${validation.errors.map(x => `${new ValidationErrorPipe().transform(x.error)} (el: ${x.element?.businessObject.name ?? 'no element'})`).join(', ')}`);
    }



}
