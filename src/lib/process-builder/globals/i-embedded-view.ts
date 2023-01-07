import { FormGroup } from "@angular/forms";
import { ITaskCreationFormGroup } from "../interfaces/i-task-creation.interface";

export class EmbeddedView {
    public formGroup!: FormGroup<Partial<ITaskCreationFormGroup>>;
    public registerFormGroup(formGroup: FormGroup<Partial<ITaskCreationFormGroup>>) {
        for (let key in formGroup.controls) {
            const control = this.formGroup.get(key);
            if (typeof control === 'undefined') continue;

            this.formGroup.setControl((key as keyof ITaskCreationFormGroup), (control as ITaskCreationFormGroup[keyof ITaskCreationFormGroup]));
        }
    }
}
