import { createReducer, MetaReducer, on, Store } from '@ngrx/store';

import { environment } from 'src/environments/environment';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { InjectionToken } from '@angular/core';
import {
  addProduct,
  addProducts,
  duplicateProduct,
  removeProduct,
  setCurrentProduct,
} from '../actions/i-product.actions';
import { v4 as generateGuid } from 'uuid';
import * as moment from 'moment';
import { IProduct } from 'src/app/interfaces/i-product.interface';

export const productFeatureKey = 'product';

export const ORDER_REDUCER_TOKEN = new InjectionToken<Store<State>>(
  'Product Reducers'
);

export interface State extends EntityState<IProduct> {
  selectedProductId: string | null;
  ids: string[];
}

export const adapter: EntityAdapter<IProduct> = createEntityAdapter<IProduct>(
  {
    selectId: (product) => product.id,
    sortComparer: (product1, product2) =>
      product1.id > product2.id ? 1 : -1,
  }
);

export const initialState: State = adapter.getInitialState({
  selectedProductId: null,
  entities: {},
  ids: [],
});

export const productReducer = createReducer(
  initialState,
  on(addProduct, (state, { product }) => {
    return adapter.addOne(
      {
        ...product,
        addedToState: moment().format(),
      },
      state
    );
  }),
  on(addProducts, (state, { products }) => {
    return adapter.addMany(
      products.map((product, index) => {
        return {
          ...product,
          addedToState: moment().format(),
          index: index,
        };
      }),
      state
    );
  }),
  on(duplicateProduct, (state, { duplicateProduct }) => {
    if (!duplicateProduct) {
      return state;
    }
    return adapter.addOne({ ...duplicateProduct, id: generateGuid() }, state);
  }),
  on(removeProduct, (state, { removeProduct }) => {
    if (!removeProduct) {
      return state;
    }
    return adapter.removeOne(removeProduct.id, state);
  }),
  on(setCurrentProduct, (currentState, { product }) => {
    const state = {
      ...currentState,
      selectedProductId: product?.id ?? null,
      selectedProductIndex: product
        ? currentState.ids.findIndex((id) => id === product.id)
        : null,
    };
    return state;
  })
);

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
