import { IDynamicInputParamsConfig } from '../globals/i-dynamic-input-params-config';
import { DynamicInputParamsPipe } from './dynamic-input-params.pipe';

describe('DynamicInputParamsPipe', () => {

  const pipe = new DynamicInputParamsPipe();

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  [
    { configValue: true, expectation: 'dynamic input params used' },
    { configValue: false, expectation: 'no dynamic input params used' },
    { configValue: undefined, expectation: 'no dynamic input params used' },
    { configValue: null, expectation: 'no dynamic input params used' },
    { configValue: { typeLimits: ['string', 'object'] } as IDynamicInputParamsConfig, expectation: `dynamic input params of the following types allowed: string, object` },
    { configValue: { typeLimits: [] } as IDynamicInputParamsConfig, expectation: 'no dynamic input params used' }
  ].forEach((entry) => {

    it(`should return correct value for config '${entry.configValue}': ${entry.expectation}`, () => {
      expect(pipe.transform(entry.configValue)).toBe(entry.expectation);
    });

  });

});
