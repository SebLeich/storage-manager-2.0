import { createReducer, MetaReducer, on, Store } from '@ngrx/store';

import { environment } from 'src/environments/environment';
import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { InjectionToken } from '@angular/core';
import {
  addOrder,
  addOrders,
  clearOrders,
  duplicateOrder,
  orderChanged,
  removeOrder,
  setCurrentOrder,
  setOrders,
} from '../actions/i-order.actions';
import { v4 as generateGuid } from 'uuid';
import { IOrder } from 'src/app/interfaces/i-order.interface';
import { updateCalculationAttributes } from '../actions/i-calculation-attribute.actions';
import { removeGroup } from '../actions/i-group.actions';
import { productChanged, removeProduct } from '../actions/i-product.actions';

export const orderFeatureKey = 'order';

export const ORDER_REDUCER_TOKEN = new InjectionToken<Store<State>>(
  'Order Reducers'
);

export interface State extends EntityState<IOrder> {
  selectedOrderId: string | null;
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

export const orderReducer = createReducer(
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
  on(orderChanged, (state, { currentOrder }) => {
    const update = {
      id: currentOrder.id,
      changes: {
        description: currentOrder.description,
        group: currentOrder.group,
        height: currentOrder.height,
        index: currentOrder.index,
        length: currentOrder.length,
        quantity: currentOrder.quantity,
        stackingAllowed: currentOrder.stackingAllowed,
        turningAllowed: currentOrder.turningAllowed,
        width: currentOrder.width
      }
    } as Update<IOrder>;
    return adapter.updateOne(update, state);
  }),
  on(productChanged, (state, { currentProduct, previousProduct }) => {
    const effectedOrderIds = Object.values(state.entities).filter(order => order?.description === previousProduct.description).map(order => order!.id);
    return adapter.updateMany(effectedOrderIds.map(orderId => {
      return {
        id: orderId,
        changes: {
          description: currentProduct.description,
          height: currentProduct.height,
          length: currentProduct.length,
          width: currentProduct.width
        }
      }
    }), state)
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
  on(removeProduct, (state, { removeProduct }) => {
    const productOrders = Object.values(state.entities).filter(order => order && order.description === removeProduct.description).map(order => order!.id);
    return adapter.removeMany(productOrders, state);
  }),
  on(setCurrentOrder, (currentState, { order }) => {
    const state: State = {
      ...currentState,
      selectedOrderId: order?.id ?? null
    };
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
      selectedOrderId: null,
      selectedOrderIndex: null,
    };
    return state;
  }),
  on(updateCalculationAttributes, (_, { orders }) => {
    const entities: { [key: string]: IOrder } = {};
    orders.forEach(order => entities[order.id] = order);
    return {
      entities: entities,
      ids: orders.map(order => order.id),
      selectedOrderId: null
    };
  }),
);

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
