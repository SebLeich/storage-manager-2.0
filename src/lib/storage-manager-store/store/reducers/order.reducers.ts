import { createReducer, MetaReducer, on } from '@ngrx/store';

import { environment } from 'src/environments/environment';
import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import {
  addOrder,
  addOrders,
  clearOrders,
  duplicateOrder,
  updateOrder,
  removeOrder,
  setCurrentOrder,
  setOrders,
  updateOrdersByDescription,
} from '../actions/order.actions';
import { v4 as generateGuid } from 'uuid';
import { IOrder } from 'src/lib/storage-manager-store/interfaces/order.interface';
import { updateCalculationAttributes } from '../actions/calculation-attribute.actions';
import { removeGroup } from '../actions/group.actions';
import { setExemplarySolution } from '../actions/solution.actions';
import exemplarySolution from 'src/assets/exemplary-solution.json';

export const orderFeatureKey = 'order';

export interface State extends EntityState<IOrder> {
  ids: string[];
}

export const adapter: EntityAdapter<IOrder> = createEntityAdapter<IOrder>(
  {
    selectId: (order) => order.id,
    sortComparer: (order1, order2) =>
      order1.id > order2.id ? 1 : -1,
  }
);

export const initialState: State = adapter.getInitialState({
  selectedOrderId: null,
  entities: {},
  ids: [],
});

export const reducer = createReducer(
  initialState,
  on(addOrder, (state, { order }) => {
    return adapter.addOne(order, state);
  }),
  on(addOrders, (state, { orders }) => {
    return adapter.addMany(orders, state);
  }),
  on(clearOrders, () => {
    return {
      entities: {},
      ids: [],
      selectedOrderId: null
    };
  }),
  on(duplicateOrder, (state, { duplicateOrder }) => {
    if (!duplicateOrder) {
      return state;
    }
    return adapter.addOne({ ...duplicateOrder, id: generateGuid() }, state);
  }),
  on(updateOrder, (state, { order }) => {
    const update = {
      id: order.id,
      changes: {
        description: order.description,
        group: order.group,
        height: order.height,
        index: order.index,
        length: order.length,
        quantity: order.quantity,
        stackingAllowed: order.stackingAllowed,
        turningAllowed: order.turningAllowed,
        width: order.width
      }
    } as Update<IOrder>;
    return adapter.updateOne(update, state);
  }),
  on(removeGroup, (state, { removeGroup }) => {
    const groupOrders = Object.values(state.entities).filter(order => order && order.group === removeGroup.id).map(order => order!.id);
    return adapter.removeMany(groupOrders, state);
  }),
  on(removeOrder, (state, { removeOrder }) => {
    if (!removeOrder) {
      return state;
    }
    return adapter.removeOne(removeOrder.id, state);
  }),
  on(setCurrentOrder, (currentState, { order }) => {
    const state: State = {
      ...currentState
    };
    return state;
  }),
  on(setExemplarySolution, () => {
    let entities: { [key: string]: IOrder } = {};
    for (let order of exemplarySolution.orders) {
      entities[order.id] = order;
    }
    const state = {
      entities: entities,
      ids: exemplarySolution.orders.map(order => order.id),
      selectedOrderId: null
    } as State;
    return state;
  }),
  on(setOrders, (_, { orders }) => {
    const entities: { [key: string]: IOrder } = {};
    for (let order of orders) {
      entities[order.id] = order;
    }
    const state = {
      entities: entities,
      ids: Object.keys(entities),
      selectedOrderId: null
    };
    return state;
  }),
  on(updateCalculationAttributes, (_, { orders }) => {
    const entities: { [key: string]: IOrder } = {};
    for (let order of orders ?? []) {
      entities[order.id] = order;
    }
    return {
      entities: entities,
      ids: orders?.map(order => order.id) ?? [],
      selectedOrderId: null
    };
  }),
  on(updateOrdersByDescription, (state, { previousDescription, currentValues }) => {
    const matchingOrders: IOrder[] = Object.values(state.entities).filter(order => order?.description === previousDescription) as IOrder[];
    return adapter.updateMany(matchingOrders.map(order => {
      return {
        id: order.id,
        changes: currentValues
      } as Update<IOrder>;
    }), state);
  })
);

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
