import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../interfaces/product.interface';

export const productActions = {
  AddProduct: '[Product] Add Product',
  AddProducts: '[Product] Add Products',
  RouteToProduct: '[Product] Route To Product',
  SetCurrentProduct: '[Product] Set Current Product',
  SetNextProduct: '[Product] Set Next Product',
  UpdateProduct: '[Product] Update Product',
  UpdateProductByDescription: '[Product] Update Product By Description',
}

export const addProduct = createAction(
  productActions.AddProduct,
  props<{ product: IProduct }>()
);

export const addProducts = createAction(
  productActions.AddProducts,
  props<{ products: IProduct[] }>()
);

export const duplicateProduct = createAction(
  productActions.SetCurrentProduct,
  props<{ duplicateProduct: IProduct }>()
);

export const updateProduct = createAction(
  productActions.UpdateProduct,
  props<{ product: IProduct }>()
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

export const updateProductByDescription = createAction(
  productActions.UpdateProductByDescription,
  props<{ previousDescription: string, currentValues: Partial<IProduct> }>()
);
