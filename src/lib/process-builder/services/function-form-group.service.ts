import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IFunction, IParam } from '../interfaces';
import { ITaskCreationFormGroupValue } from '../interfaces/task-creation-form-group-value.interface';
import { selectSnapshot } from '../globals/select-snapshot';
import { selectFunction, selectIInterface, selectIParam } from '../store/selectors';
import { CodemirrorRepository } from '@/lib/core/codemirror.repository';
import defaultImplementation from '../globals/default-implementation';

@Injectable()
export class FunctionFormGroupService {

  constructor(private _store: Store) { }

  public async getFunctionFormGroupValue(arg: number | null | undefined | IFunction, overwriteOutputParamName: boolean): Promise<ITaskCreationFormGroupValue> {
    const formGroupValue: ITaskCreationFormGroupValue = { } as ITaskCreationFormGroupValue;
    if(arg == null){
      return formGroupValue;
    }

    const selectedFunction = typeof arg === 'number'? await selectSnapshot(this._store.select(selectFunction(arg))) : arg;
    if(!selectedFunction){
      return formGroupValue;
    }

    const implementation = selectedFunction.requireCustomImplementation? CodemirrorRepository.stringToTextLeaf(selectedFunction._isImplementation? selectedFunction.customImplementation: selectedFunction.implementation ?? defaultImplementation) : null;
		formGroupValue.functionIdentifier = selectedFunction.identifier;
    formGroupValue.functionCanFail = selectedFunction.canFail as boolean;
    formGroupValue.functionName = selectedFunction.name;
    formGroupValue.functionNormalizedName = selectedFunction.normalizedName as string;
    formGroupValue.functionImplementation = implementation;
    formGroupValue.outputParamInterface = selectedFunction.outputTemplate && selectedFunction.outputTemplate !== 'dynamic'? selectedFunction.outputTemplate: null;

		if (!selectedFunction._isImplementation && selectedFunction.outputTemplate && overwriteOutputParamName) {
			const template = await selectSnapshot(this._store.select(selectIInterface(selectedFunction.outputTemplate)));
			formGroupValue.outputParamName = template?.name ?? '';
			formGroupValue.outputParamNormalizedName = template?.normalizedName ?? '';
		}
		else if(selectedFunction._isImplementation && typeof selectedFunction.output === 'number') {
			const output = await selectSnapshot(this._store.select(selectIParam(selectedFunction.output)));
			formGroupValue.outputParamName = (output as IParam).name;
			formGroupValue.outputParamNormalizedName = (output as IParam).normalizedName;
		}

		return formGroupValue;
  }
}
