import { selectSnapshot } from "@/lib/process-builder/globals/select-snapshot";
import { selectIFunction, selectIParams } from "@/lib/process-builder/store/selectors";
import { AbstractControl } from "@angular/forms";
import { Store } from "@ngrx/store";
import { TaskCreationFormGroup } from "src/lib/process-builder/interfaces/task-creation-form-group-value.interface";
import { FunctionOutputService } from "../../../process-builder/services/function-output.service";

export const outputNameValidator = (store: Store) => async (control: AbstractControl) => {
    const functionOutputService = new FunctionOutputService(store),
        formValue = (control as TaskCreationFormGroup).value;

    const selectedFunction = await selectSnapshot(store.select(selectIFunction(formValue.functionIdentifier)));
    if(!selectedFunction){
        return null;
    }

    const { hasOutput, outputParamIdentifier } = await functionOutputService.detectFunctionOutput(selectedFunction);
    if (hasOutput && !formValue.outputParamName) {
        return { outputParamNameRequired: true };
    }

    const outputParams = await selectSnapshot(store.select(selectIParams()));
    const duplicateParamExisting = outputParams.some(param => param.name === formValue.outputParamName && param.identifier !== outputParamIdentifier);

    if(duplicateParamExisting){
        return { duplicateParamExisting: true };
    }

    return null;
}
