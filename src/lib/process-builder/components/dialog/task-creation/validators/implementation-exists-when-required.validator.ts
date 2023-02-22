import { AbstractControl } from "@angular/forms";
import { TaskCreationFormGroup } from "src/lib/process-builder/interfaces/task-creation-form-group-value.interface";

export const implementationExistsWhenRequiredValidator = (control: AbstractControl) => {
    const formGroup = control as TaskCreationFormGroup;
    if (formGroup.controls.implementation?.value || !formGroup.controls.requireCustomImplementation?.value) {
        return null;
    }
    return { implementationExistsWhenRequiredValidator: true };
}
