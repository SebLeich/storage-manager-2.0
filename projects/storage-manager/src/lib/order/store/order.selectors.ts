import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State, FEATURE_KEY } from "./order.reducer";
import { Order } from "@/lib/storage-manager/types/order.type";

export const orderState = createFeatureSelector<State>(FEATURE_KEY);

export const selectOrders = createSelector(orderState, (state) => Object.values(state.entities).filter(order => order) as Order[]);

export const selectValidOrders = createSelector(selectOrders, (orders) => orders.filter(order => order.quantity > 0 && order.width > 0 && order.height > 0 && order.length > 0));