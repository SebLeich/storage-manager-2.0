import * as fromIFunction from './function.actions';

describe('loadIFunctions', () => {
  it('should return an action', () => {
    expect(fromIFunction.loadIFunctions().type).toBe('[IFunction] Load IFunctions');
  });
});
