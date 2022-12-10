import { TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { selectSnapshot } from '../../globals/select-snapshot';
import { selectIInterface, selectIInterfaces, selectIInterfacesByNormalizedName, selectNextId } from './interface.selectors';
import { isEqual } from 'lodash';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { addIInterfaces } from '../actions/i-interface.actions';

describe('IInterface Selectors', () => {

  let store: Store;

  const interfaces = {
    1: { identifier: 1, name: 'interface 1', normalizedName: 'interface1', typeDef: [] },
    2: { identifier: 2, name: 'interface 2', normalizedName: 'interface2', typeDef: [] },
    3: { identifier: 3, name: 'interface 3', normalizedName: 'interface3', typeDef: [] },
    4: { identifier: 4, name: 'interface 4', normalizedName: 'interface4', typeDef: [] },
    5: { identifier: 5, name: 'interface 5', normalizedName: 'interface5', typeDef: [] },
    6: { identifier: 6, name: 'interface 6', normalizedName: 'interface6', typeDef: [] },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...defaultImportsConstant
      ]
    });
    store = TestBed.inject(Store);
    store.dispatch(addIInterfaces(Object.values(interfaces)));
  });

  Object.values(interfaces).forEach(iFace => {

    it(`should select the interface with the correct identifier ${iFace.identifier}`, async () => {
      const selectionResult = await selectSnapshot(store.select(selectIInterface(iFace.identifier)));
      expect(selectionResult).toBeTruthy();
      expect(selectionResult!.normalizedName).toBe(iFace.normalizedName);
    });

  });

  it(`should select all interfaces`, async () => {
    const selectionResult = await selectSnapshot(store.select(selectIInterfaces()));
    expect(selectionResult).toBeTruthy();
    expect(selectionResult.length).toBe(Object.values(interfaces).length);

    const sortedA = selectionResult.sort((a, b) => a.identifier > b.identifier ? 1 : -1), sortedB = Object.values(interfaces).sort((a, b) => a.identifier > b.identifier ? 1 : -1);
    expect(isEqual(sortedA, sortedB)).toBeTrue();
  });

  Object.values(interfaces).forEach(iFace => {

    it(`should select the interface with the correct normalized name ${iFace.normalizedName}`, async () => {
      const selectionResult = await selectSnapshot(store.select(selectIInterfacesByNormalizedName([iFace.normalizedName])));
      expect(selectionResult).toBeTruthy();
      expect(selectionResult.length).toBe(1);
      expect(selectionResult[0].identifier).toBe(iFace.identifier);
    });

  });

  for (let index = 0; index < Object.values(interfaces).length; index++) {

    const shuffled = Object.values(interfaces).sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, index);

    it(`should select the interfaces with the correct normalized names: ${selected.map(iFace => iFace.normalizedName).join(', ')}`, async () => {
      const selectionResult = await selectSnapshot(store.select(selectIInterfacesByNormalizedName(selected.map(iFace => iFace.normalizedName))));
      expect(selectionResult).toBeTruthy();
      expect(selectionResult.length).toBe(index);
      expect(selected.every(iFace => selectionResult.findIndex(currIFace => currIFace.identifier === iFace.identifier) > -1)).toBeTrue();
    });

  }

  const correctNextId = Math.max(...Object.values(interfaces).map(iFace => iFace.identifier)) + 1;
  it(`should select the next correct id: ${correctNextId}`, async () => {
    const selectionResult = await selectSnapshot(store.select(selectNextId()));
    expect(selectionResult).toBeTruthy();
    expect(selectionResult).toBe(correctNextId);
  });

});
