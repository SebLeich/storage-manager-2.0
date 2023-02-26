import { createSelector } from '@ngrx/store';

import * as fromICalculationAttributes from '../reducers/calculation-attribute.reducers';
import * as fromIGroups from '../reducers/group.reducers';
import * as fromIOrders from '../reducers/order.reducers';
import * as fromIProducts from '../reducers/product.reducers';

const calculationAttributesState = (state: any) => state[fromICalculationAttributes.calculationAttributesFeatureKey] as fromICalculationAttributes.State;
const groupsState = (state: any) => state[fromIGroups.groupFeatureKey] as fromIGroups.State;
const ordersState = (state: any) => state[fromIOrders.orderFeatureKey] as fromIOrders.State;
const productsState = (state: any) => state[fromIProducts.featureKey] as fromIProducts.State;

export const selectCalculationContextValid = createSelector(
    calculationAttributesState,
    groupsState,
    ordersState,
    productsState,
    (calculationAttributesState, groupsState, ordersState, productsState) => {
        return calculationAttributesState.containerHeight > 0 && calculationAttributesState.containerWidth > 0 && calculationAttributesState.unit && groupsState.ids.length > 0 && ordersState.ids.length > 0 && productsState.ids.length > 0
    }
);