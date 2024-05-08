import { CalculationError } from '../components/main/calculation/enumerations/calculation-error';
import { CalculationErrorPipe } from './calculation-error.pipe';

describe('CalculationErrorPipe', () => {

  it('create an instance', () => {
    const pipe = new CalculationErrorPipe();
    expect(pipe).toBeTruthy();
  });

  [
    { error: CalculationError.AlgorithmNotImplemented, text: 'algorithm not available' },
    { error: CalculationError.ContainerNotReady, text: 'calculation failed' }
  ].forEach(wrapper => {

    it(`should return correct error message for calculation error code: ${wrapper.error}`, () => {

      expect(new CalculationErrorPipe().transform(wrapper.error)).toContain(wrapper.text);

    });

  })

});
