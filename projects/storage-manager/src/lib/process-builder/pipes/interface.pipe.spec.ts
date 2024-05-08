import { InterfacePipe } from './interface.pipe';

describe('InterfacePipe', () => {
  it('create an instance', () => {
    const pipe = new InterfacePipe({} as any);
    expect(pipe).toBeTruthy();
  });
});
