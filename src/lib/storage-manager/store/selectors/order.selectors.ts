import { createSelector } from '@ngrx/store';
import { IOrder } from '@smgr/interfaces';
import { featureKey, State } from '../reducers/order.reducers';

export const ordersState = (state: any) => state[featureKey] as State;

export const selectOrderById = (orderGuid: string | null) => createSelector(
  ordersState,
  (state: State) => {
    const order = Object.values(state.entities ?? {}).find(order => order?.id === orderGuid);
    return order ?? null;
  }
);

export const selectOrders = createSelector(
  ordersState,
  (state: State) => Object.values(state.entities ?? {}) as IOrder[]
);
