import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IInterface } from '../../globals/i-interface';
import * as fromIInterface from '../reducers/i-interface.reducer';

export const selectIInterfaceState = createFeatureSelector<fromIInterface.State>(
    fromIInterface.featureKey,
);

export const selectIInterface = (arg: undefined | null | number | (() => number)) => createSelector(
    selectIInterfaceState,
    (state: fromIInterface.State) => {
        if (arg == null || !state || !state.entities) return null;
        let code = typeof arg === 'function' ? arg() : arg;
        if (typeof code !== 'number') return null;
        return Object.values(state.entities).find(x => x?.identifier === code);
    }
);

export const selectIInterfaces = (codes?: number[]) => createSelector(
    selectIInterfaceState,
    (state: fromIInterface.State) => {
        if (!state || !state.entities) return [];
        let ifaces = Object.values(state.entities);
        if (Array.isArray(codes)) ifaces = ifaces.filter(x => codes.findIndex(y => x?.identifier === y) > -1);
        return ifaces as IInterface[];
    }
);

export const selectIInterfacesByNormalizedName = (names: string[] | null | undefined) => createSelector(
    selectIInterfaceState,
    (state: fromIInterface.State) => {
        if (!names || !state || !state.entities) return [];
        return Object.values(state.entities).filter(x => x && names.indexOf(x.normalizedName) > -1) as IInterface[];
    }
);

export const selectNextId = () => createSelector(
    selectIInterfaceState,
    (state: fromIInterface.State) => (state && state.entities ? Math.max(...Object.values(state.entities).filter(x => x ? true : false).map(x => (x as IInterface).identifier), -1) : -1) + 1
);
