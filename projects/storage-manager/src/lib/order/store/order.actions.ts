import { Order } from "@/lib/storage-manager/types/order.type";
import { createAction, props } from "@ngrx/store";

export const addOrder = createAction(
    '[Order] Add Order',
    props<{ order: Order }>()
);

export const removeOrder = createAction(
    '[Order] Remove Order',
    props<{ order: Order }>()
);

export const setOrders = createAction(
    '[Order] Set Orders',
    props<{ orders: Order[] }>()
);