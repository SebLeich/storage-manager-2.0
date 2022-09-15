import { createReducer, MetaReducer, on } from '@ngrx/store';

import { environment } from 'src/environments/environment';
import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import {
  addProduct,
  addProducts,
  duplicateProduct,
  productChanged,
  removeProduct,
  setCurrentProduct,
} from '../actions/i-product.actions';
import { v4 as generateGuid } from 'uuid';
import * as moment from 'moment';
import { IProduct } from 'src/app/interfaces/i-product.interface';
import { updateCalculationAttributes } from '../actions/i-calculation-attribute.actions';
import { orderChanged } from '../actions/i-order.actions';

export const productFeatureKey = 'product';

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
  on(orderChanged, (state, { currentOrder, previousOrder }) => {
    const effectedProductIds = Object.values(state.entities).filter(product => product && product.description === previousOrder.description).map(product => product!.id);
    return adapter.updateMany(effectedProductIds.map(productId => {
      return {
        id: productId,
        changes: {
          description: currentOrder.description,
          height: currentOrder.height,
          length: currentOrder.length,
          width: currentOrder.width
        }
      } as Update<IProduct>;
    }), state);
  }),
  on(productChanged, (state, { currentProduct }) => {
    return adapter.updateOne({
      id: currentProduct.id,
      changes: {
        description: currentProduct.description,
        height: currentProduct.height,
        length: currentProduct.length,
        width: currentProduct.width
      }
    }, state);
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
  }),
  on(updateCalculationAttributes, (_, { products }) => {
    const entities: { [key: string]: IProduct } = {};
    for(let product of products ?? []){
      entities[product.id] = product;
    }
    return {
      entities: entities,
      ids: products?.map(product => product.id) ?? [],
      selectedProductId: null
    };
  }),
);

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
