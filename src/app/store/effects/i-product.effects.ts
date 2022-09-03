import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';



@Injectable()
export class IProductEffects {

  constructor(
    private actions$: Actions
  ) { }

}
