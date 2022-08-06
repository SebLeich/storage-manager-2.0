import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ParameterRepository } from 'src/lib/core/parameter-repository';
import { IInterface } from '../../globals/i-interface';
import { IParam } from '../../globals/i-param';
import { IParamDefinition } from '../../globals/i-param-definition';
import * as fromIParam from '../reducers/i-param.reducer';

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
    let code = typeof arg === 'function' ? arg() : arg;
    if (typeof code !== 'number') return null;
    return Object.values(state.entities).find((x) => x?.identifier === code);
  });

export const selectIParams = (codes?: number[]) =>
  createSelector(selectIParamState, (state: fromIParam.State) => {
    if (!state || !state.entities) return [];
    let params = Object.values(state.entities);
    if (Array.isArray(codes))
      params = params.filter(
        (x) => codes.findIndex((y) => x?.identifier === y) > -1
      );
    return params as IParam[];
  });

export const selectIParamsByNormalizedName = (
  names: string[] | null | undefined
) =>
  createSelector(selectIParamState, (state: fromIParam.State) => {
    if (!names || !state || !state.entities) return [];
    return Object.values(state.entities).filter(
      (x) => x && names.indexOf(x.normalizedName) > -1
    ) as IParam[];
  });

export const selectNextId = () =>
  createSelector(
    selectIParamState,
    (state: fromIParam.State) =>
      (state && state.entities
        ? Math.max(
            ...Object.values(state.entities)
              .filter((x) => (x ? true : false))
              .map((x) => (x as IParam).identifier),
            -1
          )
        : -1) + 1
  );

export const selectCurrentParamOutput = createSelector(
  selectIParamState,
  (state: fromIParam.State) =>
    Object.values(state?.entities).find((x) => x.isProcessOutput) ?? null
);

export const selectIParamsByType = (
  arg:
    | { type: 'object' | 'number' | 'string' | 'boolean' | 'array', interface?: IInterface }
    | (() => { type: 'object' | 'number' | 'string' | 'boolean' | 'array', interface?: IInterface })
) =>
  createSelector(selectIParamState, (state: fromIParam.State) => {
    if (!arg || !state || !state.entities) return [];
    let def = typeof arg === 'function' ? arg() : arg;
    return Object.values(state.entities).filter((x) => {
        if(def.type === 'object'){
            if(!Array.isArray(x.typeDef)) return false;
            return ParameterRepository.objectsMatch(def.interface?.typeDef, x.typeDef);
        }
        else
        {
          return x.typeDef? (x.typeDef as IParamDefinition).type === def.type: true;
        }
    }) as IParam[];
  });
