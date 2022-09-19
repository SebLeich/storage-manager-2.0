import { createAction, props } from '@ngrx/store';
import { IOrder } from 'src/app/interfaces/i-order.interface';

export const orderActions = {
  AddOrder: '[Order] Add Order',
  AddOrders: '[Order] Add Orders',
  AnnounceOrderUpdate: '[Order] Announce Order Update',
  ClearOrders: '[Order] Clear Orders',
  RemoveOrder: '[Order] Remove Order',
  RemoveOrders: '[Order] Remove Orders',
  RouteToOrder: '[Order] Route To Order',
  SetCurrentOrder: '[Order] Set Current Order',
  SetNextOrder: '[Order] Set Next Order',
  SetOrders: '[Order] Set Orders',
  UpdateOrder: '[Order] Update Order',
  updateOrderDescriptions: '[Order] Update Orders By Description'
}

export const addOrder = createAction(
  orderActions.AddOrder,
  props<{ order: IOrder }>()
);

export const addOrders = createAction(
  orderActions.AddOrders,
  props<{ orders: IOrder[] }>()
);

export const clearOrders = createAction(
  orderActions.ClearOrders
);

export const duplicateOrder = createAction(
  orderActions.SetCurrentOrder,
  props<{ duplicateOrder: IOrder }>()
);

export const removeOrder = createAction(
  orderActions.RemoveOrder,
  props<{ removeOrder: IOrder }>()
);

export const removeOrders = createAction(
  orderActions.RemoveOrders,
  props<{ removeOrders: IOrder[] }>()
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

export const updateOrder = createAction(
  orderActions.UpdateOrder,
  props<{ order: IOrder }>()
);

export const updateOrdersByDescription = createAction(
  orderActions.updateOrderDescriptions,
  props<{ previousDescription: string, currentValues: Partial<IOrder> }>()
);
