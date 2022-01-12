import { PrettyLengthPipe } from './pretty-length.pipe';

describe('PrettyLengthPipe', () => {
  it('create an instance', () => {
    const pipe = new PrettyLengthPipe();
    expect(pipe).toBeTruthy();
  });
});
