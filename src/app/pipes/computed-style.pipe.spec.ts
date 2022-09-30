import { ComputedStylePipe } from './computed-style.pipe';

describe('ComputedStylePipe', () => {
  const pipe = new ComputedStylePipe();

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  const testingValues: { attribute: string, cssInfo: keyof CSSStyleDeclaration, value: any }[] = [
    { attribute: 'background-color', cssInfo: 'backgroundColor', value: 'rgb(255, 255, 255)' },
    { attribute: 'color', cssInfo: 'color', value: 'rgb(255, 0, 5)' },
    { attribute: 'margin', cssInfo: 'margin', value: '10px' },
    { attribute: 'padding-bottom', cssInfo: 'paddingBottom', value: '0px' },
    { attribute: 'border-color', cssInfo: 'borderColor', value: 'rgb(255, 0, 120)' }
  ];

  testingValues.forEach(entry => {

    it(`should calculate correct css property ${entry.value}: ${entry.value}`, () => {
      const element = document.createElement('div');
      element.style.cssText = `${entry.attribute}: ${entry.value};`;
      document.body.appendChild(element);

      expect(pipe.transform(element, entry.cssInfo)).toBe(entry.value);
    });

  });

});
