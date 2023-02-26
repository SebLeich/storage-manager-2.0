import { createSelector } from '@ngrx/store';
import { IProduct } from '../../interfaces/product.interface';
import { featureKey, State } from '../reducers/product.reducers';

const productsState = (state: any) => state[featureKey] as State;

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
  (state: State) => (Object.values(state.entities ?? {}) as IProduct[]).sort((productA, productB) => (productA.description ?? '') > (productB.description ?? '') ? 1 : -1)
);

export const selectProductByDescription = (productDescription: string) => createSelector(
  productsState,
  (state: State) => (Object.values(state.entities ?? {}) as IProduct[]).find(product => product.description === productDescription)
);

export const selectNextProductDescription = (productDescription?: string) => createSelector(
  productsState,
  (state: State) => {
    const validatedProductDescription = productDescription ? productDescription : 'unnamed product';
    const regExp = new RegExp('^' + validatedProductDescription + '( \\(([0-9]*)\\))?$');
    const regExpExecArray = Object.values(state.entities)
      .map(product => regExp.exec(product?.description ?? ''))
      .filter(regExpExecArray => !!regExpExecArray) as RegExpExecArray[];

    if (regExpExecArray.length === 0) {
      return validatedProductDescription;
    }

    const highestVersion = Math.max(...regExpExecArray.map((entry: any) => entry[2] === null || isNaN(entry[2] as any)? 0: parseInt(entry[2])), 0) + 1;
    return `${validatedProductDescription} (${highestVersion})`;
  }
)
