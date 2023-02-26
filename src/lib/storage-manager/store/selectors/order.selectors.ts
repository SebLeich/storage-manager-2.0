import { IOrder } from 'src/lib/storage-manager-store/interfaces/order.interface';
import { createSelector } from '@ngrx/store';
import { orderFeatureKey, State } from '../reducers/order.reducers';

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
