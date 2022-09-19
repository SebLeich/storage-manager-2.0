import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';



@Injectable()
export class IProductEffects {

  constructor(
    private actions$: Actions,
    private _store: Store
  ) { }

}
