import { AbstractControl, FormGroup } from "@angular/forms";
import { ITaskCreationFormGroup } from "src/lib/process-builder/interfaces/task-creation.interface";

export const implementationExistsWhenRequiredValidator = (control: AbstractControl) => {
    const formGroup = control as FormGroup<ITaskCreationFormGroup>;
    if (formGroup.controls.implementation.value || !formGroup.controls.requireCustomImplementation.value) {
        return null;
    }
    return { noImplementation: true };
}
