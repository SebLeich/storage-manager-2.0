import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IFunction, IParam } from '@process-builder/interfaces';
import * as fromIFunction from '../reducers/function.reducer';

export const selectIFunctionState = createFeatureSelector<fromIFunction.State>(
    fromIFunction.featureKey
);

export const selectIFunction = (arg: number | null | undefined | (() => number | null | undefined)) => createSelector(
    selectIFunctionState,
    (state: fromIFunction.State) => {
        if (!state || !state.entities || typeof arg === 'undefined') {
            return null;
        }
        const code = typeof arg === 'function' ? arg() : arg;
        if (typeof code !== 'number') return null;
        return state.entities[code];
    }
);

export const selectIFunctions = (ids?: number[]) => createSelector(
    selectIFunctionState,
    (state: fromIFunction.State) => {
        if (!state || !state.entities) return [];
        let funcs = Object.values(state.entities);
        if (Array.isArray(ids)) funcs = funcs.filter(x => ids.findIndex(y => x?.identifier === y) > -1);
        return funcs as IFunction[];
    }
);

export const selectIFunctionsByOutputParam = (arg: IParam | number) => createSelector(
    selectIFunctionState,
    (state: fromIFunction.State) => {
        if (!state || !state.entities) return [];
        return Object.values(state.entities).filter(x => x && x.output === (typeof arg === 'number' ? arg : arg.identifier)) as IFunction[];
    }
);

export const selectNextFunctionIdentifier = () => createSelector(
    selectIFunctionState,
    (state: fromIFunction.State) => (state && state.entities ? Math.max(...Object.values(state.entities).filter(x => x ? true : false).map(x => (x as IFunction).identifier), -1) : -1) + 1
);
