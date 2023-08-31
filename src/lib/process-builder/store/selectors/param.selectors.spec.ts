import { TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { selectSnapshot } from '../../globals/select-snapshot';
import { selectNextParameterIdentifier } from './param.selectors';
import { isEqual } from 'lodash';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { addIParams } from '../actions/param.actions';
import { selectIParam, selectIParams, selectIParamsByNormalizedName } from './param.selectors';
import { IParam } from '../../interfaces/param.interface';

describe('IParams Selectors', () => {

  let store: Store;

  const params = {
    1: { identifier: 1, name: 'param 1', normalizedName: 'param1', _isIParam: true, defaultValue: null, interface: null, nullable: true, type: 'object', optional: false, constant: true, typeDef: [] },
    2: { identifier: 2, name: 'param 2', normalizedName: 'param2', _isIParam: true, defaultValue: null, interface: null, nullable: true, type: 'object', optional: false, constant: false, typeDef: [] },
    3: { identifier: 3, name: 'param 3', normalizedName: 'param3', _isIParam: true, defaultValue: null, interface: null, nullable: true, type: 'object', optional: false, constant: true, typeDef: [] },
    4: { identifier: 4, name: 'param 4', normalizedName: 'param4', _isIParam: true, defaultValue: null, interface: null, nullable: true, type: 'object', optional: true, constant: true, typeDef: [] },
    5: { identifier: 5, name: 'param 5', normalizedName: 'param5', _isIParam: true, defaultValue: null, interface: null, nullable: true, type: 'object', optional: true, constant: false, typeDef: [] },
    6: { identifier: 6, name: 'param 6', normalizedName: 'param6', _isIParam: true, defaultValue: null, interface: null, nullable: true, type: 'object', optional: true, constant: true, typeDef: [] },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...defaultImportsConstant
      ]
    });
    store = TestBed.inject(Store);
    store.dispatch(addIParams(Object.values(params) as IParam[]));
  });

  Object.values(params).forEach(param => {

    it(`should select the param with the correct identifier ${param.identifier}`, async () => {
      const selectionResult = await selectSnapshot(store.select(selectIParam(param.identifier))) as IParam;
      expect(selectionResult).toBeTruthy();
      expect(selectionResult.normalizedName).toBe(param.normalizedName);
    });

  });

  it(`should select all params`, async () => {
    const selectionResult = await selectSnapshot(store.select(selectIParams()));
    expect(selectionResult).toBeTruthy();
    expect(selectionResult.length).toBe(Object.values(params).length);

    const sortedA = selectionResult.sort((a, b) => a.identifier > b.identifier ? 1 : -1), sortedB = Object.values(params).sort((a, b) => a.identifier > b.identifier ? 1 : -1);
    expect(isEqual(sortedA, sortedB)).toBeTrue();
  });

  Object.values(params).forEach(param => {

    it(`should select the param with the correct normalized name ${param.normalizedName}`, async () => {
      const selectionResult = await selectSnapshot(store.select(selectIParamsByNormalizedName([param.normalizedName])));
      expect(selectionResult).toBeTruthy();
      expect(selectionResult.length).toBe(1);
      expect(selectionResult[0].identifier).toBe(param.identifier);
    });

  });

  for (let index = 0; index < Object.values(params).length; index++) {

    const shuffled = Object.values(params).sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, index);

    it(`should select the params with the correct normalized names: ${selected.map(param => param.normalizedName).join(', ')}`, async () => {
      const selectionResult = await selectSnapshot(store.select(selectIParamsByNormalizedName(selected.map(param => param.normalizedName))));
      expect(selectionResult).toBeTruthy();
      expect(selectionResult.length).toBe(index);
      expect(selected.every(param => selectionResult.findIndex(currIParam => currIParam.identifier === param.identifier) > -1)).toBeTrue();
    });

  }

  const correctNextId = Math.max(...Object.values(params).map(param => param.identifier)) + 1;
  it(`should select the next correct id: ${correctNextId}`, async () => {
    const selectionResult = await selectSnapshot(store.select(selectNextParameterIdentifier()));
    expect(selectionResult).toBeTruthy();
    expect(selectionResult).toBe(correctNextId);
  });

});
