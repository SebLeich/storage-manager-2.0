import { selectSnapshot } from "@/lib/process-builder/globals/select-snapshot";
import { selectIParams } from "@/lib/process-builder/store/selectors";
import { AbstractControl } from "@angular/forms";
import { Store } from "@ngrx/store";
import { TaskCreationFormGroup } from "src/lib/process-builder/interfaces/task-creation-form-group-value.interface";

export const outputNameValidator = (store: Store) => async (control: AbstractControl) => {
    const formValue = (control as TaskCreationFormGroup).value;
    if (typeof formValue.outputParamIdentifier === 'number' && !formValue.outputParamName) {
        return { outputParamNameRequired: true };
    }

    const outputParams = await selectSnapshot(store.select(selectIParams()));
    const duplicateParamExisting = outputParams.some(param => param.name === formValue.outputParamName && param.identifier !== formValue.outputParamIdentifier);

    if(duplicateParamExisting){
        return { duplicateParamExisting: true };
    }

    return null;
}
