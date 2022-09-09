import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { announceOrderUpdate, orderChanged } from '../actions/i-order.actions';
import { selectOrderById } from '../selectors/i-order.selectors';
import { IOrder } from 'src/app/interfaces/i-order.interface';
import { combineLatest, map, of, switchMap, take } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class IOrderEffects {

  orderChangeAnnounced$ = createEffect(() => this.actions$.pipe(
    ofType(announceOrderUpdate),
    switchMap(({ order }) => {
      return combineLatest([this._store.select(selectOrderById(order.id)), of(order)]).pipe(take(1));
    }),
    map(([previousState, currentState]) => {
      return orderChanged({ previousOrder: previousState as IOrder, currentOrder: currentState });
    })
  ));

  constructor(private actions$: Actions, private _store: Store) { }

}
