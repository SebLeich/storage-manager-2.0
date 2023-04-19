import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { IInterface } from '../../interfaces/interface.interface';
import { addIInterface, addIInterfaces, removeIInterface, updateIInterface, upsertIInterface, upsertIInterfaces } from '../actions/interface.actions';
import { v4 as generateGuid } from 'uuid';

export const featureKey = 'Interface';

function sortByIdentifier(a: IInterface, b: IInterface) {
  return a.identifier > b.identifier ? 1 : -1;
}

export const adapter: EntityAdapter<IInterface> = createEntityAdapter<IInterface>({
  selectId: (arg: IInterface) => arg.identifier,
  sortComparer: sortByIdentifier
});

export interface State extends EntityState<IInterface> {
  ids: string[];
}

export const initialState: State = {
  ids: [],
  entities: {}
};

export const reducer = createReducer(

  initialState,

  on(addIInterface, (state: State, { iface }) => {
    return adapter.addOne({
      identifier: iface.identifier ?? generateGuid(),
      name: iface.name,
      normalizedName: iface.normalizedName,
      typeDef: iface.typeDef
    }, state);
  }),

  on(addIInterfaces, (state: State, { ifaces }) => {
    const mappedInterfaces = ifaces.map(iface => ({
      identifier: iface.identifier ?? generateGuid(),
      name: iface.name,
      normalizedName: iface.normalizedName,
      typeDef: iface.typeDef
    }));
    return adapter.addMany(mappedInterfaces, state);
  }),

  on(updateIInterface, (state: State, { iface }) => {
    const update: Update<IInterface> = {
      id: iface.identifier,
      changes: {
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
    const key = typeof iface === 'string' ? iface : iface.identifier;
    return adapter.removeOne(key, state);
  }),

);

export const nextId = (state: State) => {
  const ids = state && state.entities ? (Object.values(state.entities) as IInterface[]).map(x => x.identifier) : [];
  return ids.length === 0 ? 0 : Math.max(...(ids.map(x => typeof x === 'number' ? x : 0))) + 1;
}
