import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ParamCodes } from 'src/config/param-codes';
import { IParam } from '../../globals/i-param';
import * as fromIParam from '../reducers/i-param.reducer';

export const selectIParamState = createFeatureSelector<fromIParam.State>(
    fromIParam.featureKey,
);

export const selectIParam = (arg: ParamCodes | 'dynamic' | undefined | (() => ParamCodes | 'dynamic' | undefined)) => createSelector(
    selectIParamState,
    (state: fromIParam.State) => {
        if (!state || !state.entities || !arg || arg === 'dynamic') return null;
        let code = typeof arg === 'function' ? arg() : arg;
        if (!code || code === 'dynamic') return null;
        return Object.values(state.entities).find(x => x?.identifier === code);
    }
);

export const selectIParams = (codes?: ParamCodes[]) => createSelector(
    selectIParamState,
    (state: fromIParam.State) => {
        if (!state || !state.entities) return [];
        let params = Object.values(state.entities);
        if (Array.isArray(codes)) params = params.filter(x => codes.findIndex(y => x?.identifier === y) > -1);
        return params as IParam[];
    }
);

export const selectIParamsByNormalizedName = (names: string[] | null | undefined) => createSelector(
    selectIParamState,
    (state: fromIParam.State) => {
        if (!names || !state || !state.entities) return [];
        return Object.values(state.entities).filter(x => x && names.indexOf(x.normalizedName) > -1) as IParam[];
    }
);

export const selectNextId = () => createSelector(
    selectIParamState,
    (state: fromIParam.State) => (state && state.entities ? Math.max(...Object.values(state.entities).filter(x => x ? true : false).map(x => (x as IParam).identifier), -1) : -1) + 1
);
