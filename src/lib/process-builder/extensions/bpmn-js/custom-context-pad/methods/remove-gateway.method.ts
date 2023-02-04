import { IElement } from "src/lib/bpmn-io/interfaces/element.interface";
import { inject } from '@angular/core';
import { ConfirmationService } from "src/lib/confirmation/services/confirmation.service";

export default (element: IElement) => {
    console.log(element);
    const service = inject(ConfirmationService);
    console.log(service);
}
