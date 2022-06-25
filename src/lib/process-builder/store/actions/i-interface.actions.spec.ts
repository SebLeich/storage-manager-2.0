import * as fromIInterface from './i-interface.actions';

describe('loadIInterfaces', () => {
  it('should return an action', () => {
    expect(fromIInterface.loadIInterfaces().type).toBe('[IInterface] Load IInterfaces');
  });
});
