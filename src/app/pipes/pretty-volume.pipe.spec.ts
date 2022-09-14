import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { PrettyVolumePipe } from './pretty-volume.pipe';
import { setUnit } from '../store/actions/i-calculation-attribute.actions';

@Component({
  selector: 'test-component',
  template: `
    <div id="pretty-volume-pipe-result">{{volume|prettyVolume:prettify:decimalDigits:hideDigitsWhenZero|async}}</div>
  `
})
export class TestComponent {
  @Input() public prettify!: boolean;
  @Input() public volume!: number;
  @Input() public decimalDigits: number = 2;
  @Input() public hideDigitsWhenZero: boolean = false;
}

describe('PrettyVolumePipe', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrettyVolumePipe, TestComponent],
      imports: [
        ...defaultImportsConstant
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  [
    { volume: 10000, prettify: false, unit: 'mm', expectation: '10000 mm', decimalDigits: 0, hideDigitsWhenZero: false },
    { volume: 10000, prettify: false, unit: 'mm', expectation: '10000 mm', decimalDigits: 1, hideDigitsWhenZero: false },
    { volume: 10000, prettify: false, unit: 'mm', expectation: '10000 mm', decimalDigits: 2, hideDigitsWhenZero: false },
    { volume: 10000, prettify: true, unit: 'mm', expectation: '10 cm', decimalDigits: 0, hideDigitsWhenZero: false },
    { volume: 10000, prettify: true, unit: 'mm', expectation: '10,0 cm', decimalDigits: 1, hideDigitsWhenZero: false },
    { volume: 10000, prettify: true, unit: 'mm', expectation: '10,00 cm', decimalDigits: 2, hideDigitsWhenZero: false },
    { volume: 10000, prettify: true, unit: 'mm', expectation: '10 cm', decimalDigits: 2, hideDigitsWhenZero: true },
    { volume: 10001, prettify: true, unit: 'mm', expectation: '10,001 cm', decimalDigits: 3, hideDigitsWhenZero: true },
    { volume: 1000000000, prettify: true, unit: 'mm', expectation: '1 m', decimalDigits: 2, hideDigitsWhenZero: true },
    { volume: 1000000000, prettify: false, unit: 'mm', expectation: '1000000000 mm', decimalDigits: 2, hideDigitsWhenZero: true },
    { volume: 1000000001, prettify: true, unit: 'mm', expectation: '1,000000001 m', decimalDigits: 20, hideDigitsWhenZero: true },
  ].forEach(entry => {

    it(`should display volume representation ${entry.volume} ${entry.unit}, ${entry.prettify? 'prettified': 'not prettified'}, ${entry.decimalDigits} decimal digits, ${entry.hideDigitsWhenZero? 'hide decimal digits when zero': 'show decimal digits even if zero'}`, async () => {
      TestBed.inject(Store).dispatch(setUnit({ unit: entry.unit as any }));
      component.prettify = entry.prettify;
      component.decimalDigits = entry.decimalDigits;
      component.hideDigitsWhenZero = entry.hideDigitsWhenZero;
      component.volume = entry.volume;
      fixture.detectChanges();

      await fixture.whenStable();
      fixture.detectChanges();

      const prettyVolumePipeResult = fixture.debugElement.query(By.css('#pretty-volume-pipe-result'));
      expect((prettyVolumePipeResult.nativeElement as HTMLElement).innerHTML).toContain(entry.expectation);
    });

  });

});
