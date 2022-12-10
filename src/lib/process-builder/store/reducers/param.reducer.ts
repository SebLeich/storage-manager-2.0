import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { IParam } from '../../globals/i-param';
import { addIParam, addIParams, removeIParam, updateIParam, upsertIParam, upsertIParams } from '../actions/param.actions';


export const featureKey = 'Param';

function sortByIdentifier(a: IParam, b: IParam) {
  return a.identifier > b.identifier ? 1 : -1;
}

export const adapter: EntityAdapter<IParam> = createEntityAdapter<IParam>({
  selectId: (arg: IParam) => arg.identifier,
  sortComparer: sortByIdentifier
});

export interface State extends EntityState<IParam> {
  ids: string[];
}

export const initialState: State = {
  ids: [],
  entities: {}
};

export const reducer = createReducer(

  initialState,

  on(addIParam, (state: State, { param }) => {
    return adapter.addOne({
      identifier: typeof param.identifier === 'number' ? param.identifier : nextId(state),
      defaultValue: param.defaultValue,
      name: param.name,
      normalizedName: param.normalizedName,
      constant: param.constant,
      interface: param.interface,
      nullable: param.nullable,
      optional: param.optional,
      type: param.type,
      typeDef: param.typeDef,
      _isIParam: true
    }, state);
  }),

  on(addIParams, (state: State, { params }) => {
    let output: IParam[] = [];
    for (let param of params) {
      output.push({
        identifier: typeof param.identifier === 'number' ? param.identifier : nextId(state),
        defaultValue: param.defaultValue,
        name: param.name,
        normalizedName: param.normalizedName,
        constant: param.constant,
        interface: param.interface,
        nullable: param.nullable,
        optional: param.optional,
        type: param.type,
        typeDef: param.typeDef,
        _isIParam: true
      });
    }
    return adapter.addMany(output, state);
  }),

  on(updateIParam, (state: State, { param }) => {
    let update: Update<IParam> = {
      'id': param.identifier,
      'changes': {
        defaultValue: param.defaultValue,
        name: param.name,
        normalizedName: param.normalizedName,
        constant: param.constant,
        interface: param.interface,
        nullable: param.nullable,
        optional: param.optional,
        type: param.type,
        typeDef: param.typeDef,
        isProcessOutput: param.isProcessOutput
      }
    }
    return adapter.updateOne(update, state);
  }),

  on(upsertIParam, (state: State, { param }) => {
    return adapter.upsertOne({
      _isIParam: true,
      constant: param.constant,
      defaultValue: param.defaultValue,
      identifier: param.identifier,
      interface: param.interface,
      name: param.name,
      normalizedName: param.normalizedName,
      nullable: param.nullable,
      optional: param.optional,
      type: param.type,
      typeDef: param.typeDef
    }, state);
  }),

  on(upsertIParams, (state: State, { params }) => {
    return adapter.upsertMany(params.map(param => {
      return {
        _isIParam: true,
        constant: param.constant,
        defaultValue: param.defaultValue,
        identifier: param.identifier,
        interface: param.interface,
        name: param.name,
        normalizedName: param.normalizedName,
        nullable: param.nullable,
        optional: param.optional,
        type: param.type,
        typeDef: param.typeDef
      }
    }), state);
  }),

  on(removeIParam, (state: State, { param }) => {
    let key = typeof param === 'number' ? param : param.identifier;
    return adapter.removeOne(key, state);
  }),

);

export const nextId = (state: State) => {
  let ids = state && state.entities ? (Object.values(state.entities) as IParam[]).map(x => x.identifier) : [];
  return ids.length === 0 ? 0 : Math.max(...(ids.map(x => typeof x === 'number' ? x : 0))) + 1;
}
