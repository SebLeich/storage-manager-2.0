import { ComputedStylePipe } from './computed-style.pipe';

describe('ComputedStylePipe', () => {
  it('create an instance', () => {
    const pipe = new ComputedStylePipe();
    expect(pipe).toBeTruthy();
  });
});
