import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { IBpmnJSModelEffects } from './i-bpmn-js-model.effects';

describe('IBpmnJSModelEffects', () => {
  let actions$: Observable<any>;
  let effects: IBpmnJSModelEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IBpmnJSModelEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(IBpmnJSModelEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
