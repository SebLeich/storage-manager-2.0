import { createSelector } from '@ngrx/store';

import * as fromICalculationAttributes from '../reducers/i-calculation-attribute.reducers';
import * as fromIGroups from '../reducers/i-group.reducers';
import * as fromIOrders from '../reducers/i-order.reducers';
import * as fromIProducts from '../reducers/i-product.reducers';

export const calculationAttributesState = (state: any) => state[fromICalculationAttributes.calculationAttributesFeatureKey] as fromICalculationAttributes.State;
export const groupsState = (state: any) => state[fromIGroups.groupFeatureKey] as fromIGroups.State;
export const ordersState = (state: any) => state[fromIOrders.orderFeatureKey] as fromIOrders.State;
export const productsState = (state: any) => state[fromIProducts.productFeatureKey] as fromIProducts.State;

export const selectCalculationContextValid = createSelector(
    calculationAttributesState,
    groupsState,
    ordersState,
    productsState,
    (calculationAttributesState, groupsState, ordersState, productsState) => {
        return calculationAttributesState.containerHeight > 0 && calculationAttributesState.containerWidth > 0 && calculationAttributesState.unit && groupsState.ids.length > 0 && ordersState.ids.length > 0 && productsState.ids.length > 0
    }
);