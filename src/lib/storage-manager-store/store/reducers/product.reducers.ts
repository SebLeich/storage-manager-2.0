import { createReducer, MetaReducer, on } from '@ngrx/store';

import { environment } from 'src/environments/environment';
import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import {
  addProduct,
  addProducts,
  duplicateProduct,
  removeProduct,
  setCurrentProduct,
  updateProduct,
  updateProductByDescription,
} from '../actions/product.actions';
import { v4 as generateGuid } from 'uuid';
import * as moment from 'moment';
import { IProduct } from 'src/app/interfaces/i-product.interface';
import { updateCalculationAttributes } from '../actions/calculation-attribute.actions';

import exemplarySolution from 'src/assets/exemplary-solution.json';
import { setExemplarySolution } from '../actions/solution.actions';

export const featureKey = 'product';

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

export const productState: State = adapter.getInitialState({
  selectedProductId: null,
  entities: {},
  ids: [],
});

export const reducer = createReducer(
  productState,
  on(addProduct, (state, { product }) => {
    return adapter.addOne(
      {
        ...product
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
      selectedProductId: product?.id ?? null
    };
    return state;
  }),
  on(setExemplarySolution, () => {
    let entities: { [key: string]: IProduct } = {};
    for (let product of exemplarySolution.products) {
      entities[product.id] = product;
    }
    const state = {
      entities: entities,
      ids: exemplarySolution.products.map(product => product.id),
      selectedProductId: null,
    } as State;
    return state;
  }),
  on(updateCalculationAttributes, (_, { products }) => {
    const entities: { [key: string]: IProduct } = {};
    for (let product of products ?? []) {
      entities[product.id] = product;
    }
    return {
      entities: entities,
      ids: products?.map(product => product.id) ?? [],
      selectedProductId: null
    };
  }),
  on(updateProduct, (state, { product }) => {
    return adapter.updateOne({
      id: product.id,
      changes: {
        description: product.description,
        height: product.height,
        length: product.length,
        width: product.width
      }
    }, state);
  }),
  on(updateProductByDescription, (state, { previousDescription, currentValues }) => {
    const product = Object.values(state.entities).find(product => product?.description === previousDescription);
    if (!product) {
      return state;
    }
    return adapter.updateOne({
      id: product.id,
      changes: currentValues
    }, state);
  }),
);

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
