import { InputParamPipe } from './input-param.pipe';
import { Store } from '@ngrx/store';

describe('InputParamPipe', () => {

  it('create an instance', () => {
    const pipe = new InputParamPipe({} as Store);
    expect(pipe).toBeTruthy();
  });
});
