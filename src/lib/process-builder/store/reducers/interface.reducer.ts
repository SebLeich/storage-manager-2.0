import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { IInterface } from '../../interfaces/i-interface.interface';
import { addIInterface, addIInterfaces, removeIInterface, updateIInterface, upsertIInterface, upsertIInterfaces } from '../actions/interface.actions';


export const featureKey = 'Interface';

function sortByIdentifier(a: IInterface, b: IInterface) {
  return a.identifier > b.identifier ? 1 : -1;
}

export const adapter: EntityAdapter<IInterface> = createEntityAdapter<IInterface>({
  selectId: (arg: IInterface) => arg.identifier,
  sortComparer: sortByIdentifier
});

export interface State extends EntityState<IInterface> {
  ids: number[];
}

export const initialState: State = {
  ids: [],
  entities: {}
};

export const reducer = createReducer(

  initialState,

  on(addIInterface, (state: State, { iface }) => {
    return adapter.addOne({
      identifier: typeof iface.identifier === 'number'? iface.identifier: nextId(state),
      name: iface.name,
      normalizedName: iface.normalizedName,
      typeDef: iface.typeDef
    }, state);
  }),

  on(addIInterfaces, (state: State, { ifaces }) => {
    let output: IInterface[] = [];
    for (let iface of ifaces) {
      output.push({
        identifier: typeof iface.identifier === 'number'? iface.identifier: nextId(state),
        name: iface.name,
        normalizedName: iface.normalizedName,
        typeDef: iface.typeDef
      });
    }
    return adapter.addMany(output, state);
  }),

  on(updateIInterface, (state: State, { iface }) => {
    let update: Update<IInterface> = {
      'id': iface.identifier,
      'changes': {
        name: iface.name,
        normalizedName: iface.normalizedName,
        typeDef: iface.typeDef
      }
    }
    return adapter.updateOne(update, state);
  }),

  on(upsertIInterface, (state: State, { iface }) => {
    return adapter.upsertOne(iface, state);
  }),

  on(upsertIInterfaces, (state: State, { ifaces }) => {
    return adapter.upsertMany(ifaces, state);
  }),

  on(removeIInterface, (state: State, { iface }) => {
    let key = typeof iface === 'number'? iface: iface.identifier;
    return adapter.removeOne(key, state);
  }),

);

export const nextId = (state: State) => {
  let ids = state && state.entities ? (Object.values(state.entities) as IInterface[]).map(x => x.identifier) : [];
  return ids.length === 0 ? 0 : Math.max(...(ids.map(x => typeof x === 'number' ? x : 0))) + 1;
}
