import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { IParamEffects } from './i-param.effects';

describe('IParamEffects', () => {
  let actions$: Observable<any>;
  let effects: IParamEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IParamEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(IParamEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
