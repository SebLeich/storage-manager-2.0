import defaultImplementation from "@/lib/process-builder/globals/default-implementation";
import { selectSnapshot } from "@/lib/process-builder/globals/select-snapshot";
import { selectFunction } from "@/lib/process-builder/store/selectors";
import { AbstractControl } from "@angular/forms";
import { Store } from "@ngrx/store";
import { TaskCreationFormGroup } from "src/lib/process-builder/interfaces/task-creation-form-group-value.interface";

export const implementationExistsWhenRequiredValidator = (store: Store) => async (control: AbstractControl) => {
    const formGroup = control as TaskCreationFormGroup,
        selectedFunction = await selectSnapshot(store.select(selectFunction(formGroup.controls.functionIdentifier?.value)));

    if(!selectedFunction){
        return null;
    }

    const requiredImplementationMissing = selectedFunction.requireCustomImplementation && (!formGroup.controls.functionImplementation?.value || (formGroup.controls.functionImplementation?.value?.text ?? []).join('') === defaultImplementation.join(''));

    if(!requiredImplementationMissing){
        return null;
    }
    
    return { implementationExistsWhenRequiredValidator: true };
}
