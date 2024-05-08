import { Store } from '@ngrx/store';
import { PrettyLengthPipe } from './pretty-length.pipe';

describe('PrettyLengthPipe', () => {

  const pipe = new PrettyLengthPipe({} as Store);
  const emptyMessage = 'no entries';

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  [
    { value: null, expectation: emptyMessage },
    { value: undefined, expectation: emptyMessage }
  ].forEach(async (entry) => {

    it(`should return expected output for value '${entry.value}: ${entry.expectation}'`, async () => {
      const result = await pipe.transform(entry.value);
      expect(result).toBe(entry.expectation);
    })

  });

});
