import { AbstractControl } from "@angular/forms";
import { TaskCreationFormGroup } from "src/lib/process-builder/interfaces/task-creation-form-group-value.interface";

export const functionSelectedValidator = (isRequired: boolean) => {
    return (control: AbstractControl) => {
        const formGroup = control as TaskCreationFormGroup;
        if (typeof formGroup.controls.functionIdentifier?.value === 'number' || !isRequired) {
            return null;
        }

        return { noFunctionSelected: true };
    };
}