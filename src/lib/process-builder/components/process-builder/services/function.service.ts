import { selectSnapshot } from "@/lib/process-builder/globals/select-snapshot";
import { IFunction } from "@/lib/process-builder/interfaces";
import { selectNextFunctionIdentifier } from "@/lib/process-builder/store/selectors";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

@Injectable()
export class FunctionService {

    constructor(private _store: Store) { }

    public async detectFunction(referencedFunction: IFunction) {
        let createNewFunction = false,
            functionIdentifier = null;

        if(!referencedFunction) {
            createNewFunction = true;
            functionIdentifier = await selectSnapshot(this._store.select(selectNextFunctionIdentifier()));
        }
        else {
            if(!referencedFunction._isImplementation){
                createNewFunction = true;
                functionIdentifier = await selectSnapshot(this._store.select(selectNextFunctionIdentifier()));
            }
            else {
                functionIdentifier = referencedFunction.identifier;
            }
        }

        return { createNewFunction, functionIdentifier };
    }
}