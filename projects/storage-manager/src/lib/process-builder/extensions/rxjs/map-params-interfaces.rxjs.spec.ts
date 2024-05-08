import { firstValueFrom, of } from 'rxjs';
import { IInterface, IParam, IParamDefinition } from '../../interfaces';
import { createMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { mapIParamsInterfaces } from './map-params-interfaces.rxjs';

const solutionInterface = {
  identifier: 'solution',
  name: 'solution',
  normalizedName: 'solution',
  typeDef: [
    {
      name: 'identifier',
      normalizedName: 'identifier',
      defaultValue: 0,
      type: 'number',
    },
    {
      name: 'group',
      normalizedName: 'group',
      interface: 'group',
      type: 'object',
    },
  ],
} as IInterface;

const groupInterface = {
  identifier: 'group',
  name: 'group',
  normalizedName: 'group',
  typeDef: [
    {
      name: 'identifier',
      normalizedName: 'identifier',
      defaultValue: 0,
      type: 'number',
    },
  ],
} as IInterface;

const myParam = {
  identifier: 1,
  interface: 'solution',
  type: 'object',
} as IParam;

describe('Map Param Interfaces', () => {
  const initialState = {
    initialState: {
      ifaces: {
        entities: {
          solution: solutionInterface,
          group: groupInterface,
        },
        ids: [solutionInterface.identifier, groupInterface.identifier],
      },
    },
  };

  const mockStore = createMockStore(initialState as any);

  it('should map param interfaces', async () => {
    const result: IParamDefinition[] = await firstValueFrom(of([myParam]).pipe(mapIParamsInterfaces(mockStore as Store)));
    const expected = {
      ...myParam,
      typeDef: solutionInterface.typeDef.map((def) => {
        const iFace = [solutionInterface, groupInterface].find(
          (iFace) => iFace.identifier === def.interface
        );
        if (iFace) {
          return { ...def, typeDef: iFace.typeDef };
        } else {
          return def;
        }
      }),
    };

    expect(result).toEqual([expected]);
  });
});
