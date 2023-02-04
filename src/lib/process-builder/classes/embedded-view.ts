import { FormGroup } from "@angular/forms";
import { ITaskCreationFormGroup } from "../interfaces/task-creation.interface";

export interface EmbeddedView {
    formGroup: FormGroup<Partial<ITaskCreationFormGroup>>;
}
