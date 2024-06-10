import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State, featureKey } from "./order.reducer";
import { Order } from "@/lib/storage-manager/types/order.type";

export const orderState = createFeatureSelector<State>(featureKey);

export const selectOrders = createSelector(orderState, (state) => Object.values(state.entities).filter(order => order) as Order[]);