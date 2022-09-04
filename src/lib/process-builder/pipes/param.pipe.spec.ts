import { ParamPipe } from './param.pipe';

describe('ParamPipe', () => {
  it('create an instance', () => {
    const pipe = new ParamPipe({} as any);
    expect(pipe).toBeTruthy();
  });
});
