import { AbstractControl, FormGroup } from "@angular/forms";
import { ITaskCreationFormGroup } from "src/lib/process-builder/interfaces/task-creation.interface";

export const functionSelectedsWhenRequiredValidator = (isRequired: boolean) => {
    return (control: AbstractControl) => {
        const formGroup = control as FormGroup<ITaskCreationFormGroup>;
        if (formGroup.controls.functionIdentifier.value || !isRequired) {
            return null;
        }
        return { required: true };
    };
}