import { InjectionToken } from '@angular/core';
import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';
import { createReducer, on, Store } from '@ngrx/store';
import { IFunction } from '../../globals/i-function';
import { addIFunction, addIFunctions, removeIFunction, updateIFunction, updateIFunctionOutputParam, upsertIFunctions } from '../actions/i-function.actions';


export const featureKey = 'Func';

function sort(a: IFunction, b: IFunction) {
  return a.identifier > b.identifier ? 1 : -1;
}

export const adapter: EntityAdapter<IFunction> = createEntityAdapter<IFunction>({
  selectId: (arg: IFunction) => arg.identifier,
  sortComparer: sort
});

export interface State extends EntityState<IFunction> {
  ids: string[];
}

export const initialState: State = {
  ids: [],
  entities: {}
};

export const reducer = createReducer(

  initialState,

  on(addIFunction, (state: State, { func }) => {
    return adapter.addOne(func, state);
  }),

  on(addIFunctions, (state: State, { funcs }) => {
    return adapter.addMany(funcs, state);
  }),


  on(removeIFunction, (state: State, { func }) => {
    let key = typeof func === 'number' ? func : func.identifier;
    return adapter.removeOne(key, state);
  }),

  on(updateIFunction, (state: State, { func }) => {
    let update: Update<IFunction> = {
      'id': func.identifier,
      'changes': {
        'canFail': func.canFail,
        'description': func.description,
        'inputParams': func.inputParams,
        'name': func.name,
        'normalizedName': func.normalizedName,
        'output': func.output,
        'customImplementation': func.customImplementation,
        'pseudoImplementation': func.pseudoImplementation,
        'requireCustomImplementation': func.requireCustomImplementation,
        'useDynamicInputParams': func.useDynamicInputParams
      }
    }
    return adapter.updateOne(update, state);
  }),

  on(updateIFunctionOutputParam, (state: State, { identifier, outputParam }) => {
    let update: Update<IFunction> = {
      'id': identifier,
      'changes': { 'output': { 'param': outputParam } }
    }
    return adapter.updateOne(update, state);
  }),

  on(upsertIFunctions, (state: State, { funcs }) => {
    return adapter.upsertMany(funcs, state);
  }),

);

export const nextId = (state: State) => {
  let ids = state && state.entities ? (Object.values(state.entities) as IFunction[]).map(x => x.identifier) : [];
  return ids.length === 0 ? 0 : Math.max(...(ids.map(x => typeof x === 'number' ? x : 0))) + 1;
}

export const FUNCTION_STORE_TOKEN = new InjectionToken<Store<State>>("FUNCTION_STORE");
