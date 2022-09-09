import { createAction, props } from '@ngrx/store';
import { IProduct } from 'src/app/interfaces/i-product.interface';

export const productActions = {
  AddProduct: '[Product] Add Product',
  AddProducts: '[Product] Add Products',
  AnnounceProductUpdate: '[Product] Announce Product Update',
  ProductChanged: '[Product] Product Changed',
  RouteToProduct: '[Product] Route To Product',
  SetCurrentProduct: '[Product] Set Current Product',
  SetNextProduct: '[Product] Set Next Product',
  UpdateProduct: '[Product] Update Product'
}

export const addProduct = createAction(
  productActions.AddProduct,
  props<{ product: IProduct }>()
);

export const addProducts = createAction(
  productActions.AddProducts,
  props<{ products: IProduct[] }>()
);

export const announceProductUpdate = createAction(
  productActions.AnnounceProductUpdate,
  props<{ product: IProduct }>()
);

export const duplicateProduct = createAction(
  productActions.SetCurrentProduct,
  props<{ duplicateProduct: IProduct }>()
);

export const productChanged = createAction(
  productActions.UpdateProduct,
  props<{ previousProduct: IProduct, currentProduct: IProduct }>()
);

export const removeProduct = createAction(
  productActions.SetCurrentProduct,
  props<{ removeProduct: IProduct }>()
);

export const setCurrentProduct = createAction(
  productActions.SetCurrentProduct,
  props<{ product: IProduct | null }>()
);

export const setNextProduct = createAction(
  productActions.SetNextProduct
);
