import { By } from '@angular/platform-browser';
import { FunctionPreviewComponent } from './function-preview.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { IFunction } from 'src/lib/process-builder/interfaces/function.interface';
import { v4 as generateGuid } from 'uuid';

let fixture: ComponentFixture<FunctionPreviewComponent>, component: FunctionPreviewComponent;


describe('FunctionPreviewComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FunctionPreviewComponent],
      imports: [
        ...defaultImportsConstant
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FunctionPreviewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display function name', () => {
    const func: IFunction = { name: generateGuid() } as IFunction;
    component.func = func;
    fixture.detectChanges();

    const componentText = (fixture.debugElement.nativeElement as HTMLElement).textContent ?? '';
    expect(componentText.toLowerCase()).toContain(func.name.toLowerCase());
  });

  it('should display function description', () => {
    const func: IFunction = { description: generateGuid() } as IFunction;
    component.func = func;
    fixture.detectChanges();

    const componentText = (fixture.debugElement.nativeElement as HTMLElement).innerText;
    expect(componentText).toContain(func.description!);
  });

  [true, false].forEach(customImplementationRequired => {

    it(`should display custom implementation required hint: ${customImplementationRequired}`, () => {
      const func: IFunction = { requireCustomImplementation: customImplementationRequired } as IFunction;
      component.func = func;
      fixture.detectChanges();
  
      const componentText = (fixture.debugElement.nativeElement as HTMLElement).innerText;
      if(customImplementationRequired){
        expect(componentText).toContain(component.customImplementationRequiredText);
      } else {
        expect(componentText).not.toContain(component.customImplementationRequiredText);
      }
    });

  });

});
