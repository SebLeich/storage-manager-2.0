import { createAction, props } from '@ngrx/store';
import { IOrder } from 'src/app/interfaces/i-order.interface';

export const orderActions = {
  AddOrder: '[Order] Add Order',
  AddOrders: '[Orders] Add Orders',
  RouteToOrder: '[Order] Route To Order',
  SetCurrentOrder: '[Order] Set Current Order',
  SetNextOrder: '[Order] Set Next Order'
}

export const addOrder = createAction(
  orderActions.AddOrder,
  props<{ order: IOrder }>()
);

export const addOrders = createAction(
  orderActions.AddOrders,
  props<{ orders: IOrder[] }>()
);

export const duplicateOrder = createAction(
  orderActions.SetCurrentOrder,
  props<{ duplicateOrder: IOrder }>()
);

export const removeOrder = createAction(
  orderActions.SetCurrentOrder,
  props<{ removeOrder: IOrder }>()
);

export const setCurrentOrder = createAction(
  orderActions.SetCurrentOrder,
  props<{ order: IOrder | null }>()
);

export const setNextOrder = createAction(
  orderActions.SetNextOrder
);
