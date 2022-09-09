import { createAction, props } from '@ngrx/store';
import { IOrder } from 'src/app/interfaces/i-order.interface';

export const orderActions = {
  AddOrder: '[Order] Add Order',
  AddOrders: '[Order] Add Orders',
  AnnounceOrderUpdate: '[Order] Announce Order Update',
  ClearOrders: '[Order] Clear Orders',
  OrderChanged: '[Order] Order Changed',
  RouteToOrder: '[Order] Route To Order',
  SetCurrentOrder: '[Order] Set Current Order',
  SetNextOrder: '[Order] Set Next Order',
  SetOrders: '[Order] Set Orders',
}

export const addOrder = createAction(
  orderActions.AddOrder,
  props<{ order: IOrder }>()
);

export const addOrders = createAction(
  orderActions.AddOrders,
  props<{ orders: IOrder[] }>()
);

export const announceOrderUpdate = createAction(
  orderActions.AnnounceOrderUpdate,
  props<{ order: IOrder }>()
);

export const clearOrders = createAction(
  orderActions.ClearOrders
);

export const duplicateOrder = createAction(
  orderActions.SetCurrentOrder,
  props<{ duplicateOrder: IOrder }>()
);

export const orderChanged = createAction(
  orderActions.OrderChanged,
  props<{ currentOrder: IOrder, previousOrder: IOrder }>()
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

export const setOrders = createAction(
  orderActions.SetOrders,
  props<{ orders: IOrder[] }>()
);
