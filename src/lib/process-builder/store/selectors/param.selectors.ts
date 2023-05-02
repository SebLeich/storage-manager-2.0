import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IParam } from '../../interfaces/param.interface';
import * as fromIParam from '../reducers/param.reducer';

export const selectIParamState = createFeatureSelector<fromIParam.State>(
  fromIParam.featureKey
);

export const selectIParam = (
  arg:
    | number
    | 'dynamic'
    | undefined
    | null
    | (() => number | 'dynamic' | null | undefined)
) =>
  createSelector(selectIParamState, (state: fromIParam.State) => {
    if (!state || !state.entities || !arg || arg === 'dynamic') return null;
    const code = typeof arg === 'function' ? arg() : arg;
    if (typeof code !== 'number') return null;

    return state.entities[code];
  });

export const selectIParams = (arg?: number[] | (() => number[])) => createSelector(selectIParamState, (state: fromIParam.State) => {
  if (!state || !state.entities) {
    return [];
  }
  let params = Object.values(state.entities);
  const paramCodes = typeof arg === 'function' ? arg() : arg;
  if (Array.isArray(paramCodes))
    params = params.filter(
      (param) => paramCodes.findIndex((y) => param?.identifier === y) > -1
    );
  return params as IParam[];
});

export const selectIParamByNormalizedName = (name: string) => createSelector(selectIParamState, (state: fromIParam.State) => Object.values(state.entities).find((x) => x?.normalizedName === name) as IParam);

export const selectIParamsByNormalizedName = (
  names: string[] | null | undefined
) =>
  createSelector(selectIParamState, (state: fromIParam.State) => {
    if (!names || !state || !state.entities) return [];
    return Object.values(state.entities).filter(
      (x) => x && names.indexOf(x.normalizedName) > -1
    ) as IParam[];
  });

export const selectNextParameterIdentifier = () =>
  createSelector(
    selectIParamState,
    (state: fromIParam.State) => Math.max(...state.ids, 1) + 1
  );

export const selectCurrentParamOutput = createSelector(
  selectIParamState,
  (state: fromIParam.State) =>
    Object.values(state?.entities).find((iParam) => iParam?.isProcessOutput) ?? null
);
