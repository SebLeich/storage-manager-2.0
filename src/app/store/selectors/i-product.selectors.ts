import { IProduct } from 'src/app/interfaces/i-product.interface';
import { createSelector } from '@ngrx/store';
import { productFeatureKey, State } from '../reducers/i-product.reducers';

export const productsState = (state: any) => state[productFeatureKey] as State;

export const selectNextProductId = createSelector(
  productsState,
  (state: State) => {

    if (typeof state.selectedProductId === 'string') {
      const index = Object.values(state.entities).findIndex((entry) => entry!.id === state.selectedProductId);
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

export const selectProductById = (productGuid: string | null) => createSelector(
  productsState,
  (state: State) => {
    const product = Object.values(state.entities ?? {}).find(product => product?.id === productGuid);
    return product ?? null;
  }
);

export const selectProducts = createSelector(
  productsState,
  (state: State) => Object.values(state.entities ?? {}) as IProduct[]
);
