import { IParam } from '../globals/i-param';
import { ParamPipe } from './param.pipe';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { Store } from '@ngrx/store';
import { addIParams } from '../store/actions/i-param.actions';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'test-component',
  template: `
    <div id="param-pipe-result">{{param|param|async}}</div>
  `
})
export class TestComponent {
  @Input() public param!: number;
}

describe('ParamPipe', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  const params = [
    {
      name: 'test param 1',
      identifier: 1
    } as IParam,
    {
      name: 'test param 2',
      identifier: 2
    } as IParam
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamPipe, TestComponent ],
      imports: [
        ...defaultImportsConstant
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    TestBed.inject(Store).dispatch(addIParams(params));
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  params.forEach((param: IParam) => {

    it(`should return param name ${param.name}`, async () => {
      const paramPipeResult = fixture.debugElement.query(By.css('#param-pipe-result'));
      component.param = param.identifier;
      fixture.detectChanges();

      await fixture.whenStable();

      expect((paramPipeResult.nativeElement as HTMLElement).innerHTML).toContain(param.name);
    });

  })

});
