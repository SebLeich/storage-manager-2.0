import { IOrder } from 'src/app/interfaces/i-order.interface';
import { createSelector } from '@ngrx/store';
import { orderFeatureKey, State } from '../reducers/i-order.reducers';

export const ordersState = (state: any) => state[orderFeatureKey] as State;

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
