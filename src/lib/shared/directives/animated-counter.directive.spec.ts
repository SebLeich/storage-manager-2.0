import { Component, Input } from '@angular/core';
import { AnimatedCounterDirective } from './animated-counter.directive';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';

@Component({
  selector: 'app-test-component',
  template: `
    <span appAnimatedCounter [value]=value [animationDuration]=duration></span>
  `
})
export class TestComponent
{
  @Input() value!: number;
  @Input() duration = 2000;
}


describe('AnimatedCounterDirective', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimatedCounterDirective, TestComponent ],
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

  it('should start with 0', () => {
    component.value = 80;
    fixture.detectChanges();

    const innerText = (fixture.debugElement.nativeElement as HTMLSpanElement).innerText;
    const numericContent = innerText.match(/\d/g)?.join('');

    expect(isNaN(numericContent as any)).toBeFalsy();
    expect(parseInt(numericContent!)).toBe(0);
  });

  it('should animate numeric value', fakeAsync(() => {
    component.value = 80;
    fixture.detectChanges();

    tick(1000);
    discardPeriodicTasks();

    const innerText = (fixture.debugElement.nativeElement as HTMLSpanElement).innerText;
    const numericContent = innerText.match(/\d/g)?.join('');

    expect(isNaN(numericContent as any)).toBeFalsy();
    expect(parseInt(numericContent!)).toBeGreaterThan(0);
    expect(parseInt(numericContent!)).toBeLessThan(component.value);
  }));

  it('should end with setted value', fakeAsync(() => {
    component.value = 80;
    fixture.detectChanges();

    tick(component.duration + 1);
    discardPeriodicTasks();

    const innerText = (fixture.debugElement.nativeElement as HTMLSpanElement).innerText;
    const numericContent = innerText.match(/\d/g)?.join('');

    expect(isNaN(numericContent as any)).toBeFalsy();
    expect(parseInt(numericContent!)).toBe(component.value);
  }));

});
