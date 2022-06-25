import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { IInterfaceEffects } from './i-interface.effects';

describe('IInterfaceEffects', () => {
  let actions$: Observable<any>;
  let effects: IInterfaceEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IInterfaceEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(IInterfaceEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
