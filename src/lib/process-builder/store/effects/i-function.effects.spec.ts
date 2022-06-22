import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { IFunctionEffects } from './i-function.effects';

describe('IFunctionEffects', () => {
  let actions$: Observable<any>;
  let effects: IFunctionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IFunctionEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(IFunctionEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
