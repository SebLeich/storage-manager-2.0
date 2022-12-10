import * as fromIParam from './param.actions';

describe('loadIParams', () => {
  it('should return an action', () => {
    expect(fromIParam.loadIParams().type).toBe('[IParam] Load IParams');
  });
});
