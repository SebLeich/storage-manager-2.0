import { ValidationErrorPipe } from './validation-error.pipe';

describe('ValidationErrorPipe', () => {
  it('create an instance', () => {
    const pipe = new ValidationErrorPipe();
    expect(pipe).toBeTruthy();
  });
});
