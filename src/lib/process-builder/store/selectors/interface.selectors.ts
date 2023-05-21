import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IInterface } from '../../interfaces/interface.interface';
import * as fromIInterface from '../reducers/interface.reducer';

export const selectIInterfaceState = createFeatureSelector<fromIInterface.State>(
    fromIInterface.featureKey,
);

export const selectIInterface = (arg: undefined | null | string | (() => string)) => createSelector(
    selectIInterfaceState,
    (state: fromIInterface.State) => {
        if (arg == null || !state || !state.entities) {
            return null;
        }

        const code = typeof arg === 'function' ? arg() : arg;
        if (code === 'dynamic' || typeof code !== 'string') {
            return null;
        }

        const iFaces = Object.values(state.entities);
        const iFace = iFaces.find(iFace => iFace?.identifier === code);
        return iFace ?? null;
    }
);

export const selectIInterfaces = (identifiers?: string[]) => createSelector(
    selectIInterfaceState,
    (state: fromIInterface.State) => {
        if (!state || !state.entities) {
            return [];
        }

        let ifaces = Object.values(state.entities);
        if (Array.isArray(identifiers)) {
            ifaces = ifaces.filter(iFace => identifiers.findIndex(identifier => iFace?.identifier === identifier) > -1);
        }

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
