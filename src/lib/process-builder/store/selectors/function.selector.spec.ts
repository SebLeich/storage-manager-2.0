import { TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { selectSnapshot } from '../../globals/select-snapshot';
import { isEqual } from 'lodash';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { IFunction } from '../../globals/i-function';
import { addIFunctions } from '../actions/function.actions';
import { selectIFunction, selectIFunctions, selectNextId } from './function.selector';

describe('IFunction Selectors', () => {

  let store: Store;

  const funcs = {
    1: { identifier: 1, name: 'function 1', normalizedName: 'function1' } as IFunction,
    2: { identifier: 2, name: 'function 2', normalizedName: 'function2' } as IFunction,
    3: { identifier: 3, name: 'function 3', normalizedName: 'function3' } as IFunction,
    4: { identifier: 4, name: 'function 4', normalizedName: 'function4' } as IFunction,
    5: { identifier: 5, name: 'function 5', normalizedName: 'function5' } as IFunction,
    6: { identifier: 6, name: 'function 6', normalizedName: 'function6' } as IFunction,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...defaultImportsConstant
      ]
    });
    store = TestBed.inject(Store);
    store.dispatch(addIFunctions(Object.values(funcs)));
  });

  Object.values(funcs).forEach(func => {

    it(`should select the function with the correct identifier ${func.identifier}`, async () => {
      const selectionResult = await selectSnapshot(store.select(selectIFunction(func.identifier)));
      expect(selectionResult).toBeTruthy();
      expect(selectionResult!.normalizedName).toBe(func.normalizedName);
    });

  });

  it(`should select all functions`, async () => {
    const selectionResult = await selectSnapshot(store.select(selectIFunctions()));
    expect(selectionResult).toBeTruthy();
    expect(selectionResult.length).toBe(Object.values(funcs).length);

    const sortedA = selectionResult.sort((a, b) => a.identifier > b.identifier ? 1 : -1), sortedB = Object.values(funcs).sort((a, b) => a.identifier > b.identifier ? 1 : -1);
    expect(isEqual(sortedA, sortedB)).toBeTrue();
  });

  const correctNextId = Math.max(...Object.values(funcs).map(func => func.identifier)) + 1;
  it(`should select the next correct id: ${correctNextId}`, async () => {
    const selectionResult = await selectSnapshot(store.select(selectNextId()));
    expect(selectionResult).toBeTruthy();
    expect(selectionResult).toBe(correctNextId);
  });

});
