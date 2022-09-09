import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest, map, of, switchMap, take } from 'rxjs';
import { IProduct } from 'src/app/interfaces/i-product.interface';
import { announceProductUpdate, productChanged } from '../actions/i-product.actions';
import { selectProductById } from '../selectors/i-product.selectors';



@Injectable()
export class IProductEffects {

  productChangeAnnounced$ = createEffect(() => this.actions$.pipe(
    ofType(announceProductUpdate),
    switchMap(({ product }) => {
      return combineLatest([this._store.select(selectProductById(product.id)), of(product)]).pipe(take(1));
    }),
    map(([previousState, currentState]) => {
      return productChanged({ previousProduct: previousState as IProduct, currentProduct: currentState });
    })
  ));

  constructor(
    private actions$: Actions,
    private _store: Store
  ) { }

}
