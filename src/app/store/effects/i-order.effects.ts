import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

@Injectable()
export class IOrderEffects {

  constructor(private actions$: Actions, private _store: Store) { }

}
