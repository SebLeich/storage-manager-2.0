import { UntypedFormGroup } from "@angular/forms";

export interface IEmbeddedView {
    formGroup: UntypedFormGroup;
    ngOnDestroy: () => void;
}
