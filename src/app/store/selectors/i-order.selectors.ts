import { IOrder } from 'src/app/interfaces/i-order.interface';
import { createSelector } from '@ngrx/store';
import { orderFeatureKey, State } from '../reducers/i-order.reducers';

export const ordersState = (state: any) => state[orderFeatureKey] as State;

export const selectNextOrderId = createSelector(
  ordersState,
  (state: State) => {

    if (typeof state.selectedOrderId === 'string') {
      const index = Object.values(state.entities).findIndex((entry) => entry!.id === state.selectedOrderId);
      if (index === state.ids.length - 1) {
        return state.ids[0];
      }
      return state.ids[index + 1];
    } else if (state.ids.length > 0) {
      return state.ids[0];
    }
    return null;
  }
)

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
