import { FormGroup } from "@angular/forms";

export interface IEmbeddedView {
    formGroup: FormGroup;
    ngOnDestroy: () => void;
}
