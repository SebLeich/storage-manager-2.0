import { ComponentFixture, TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { IFunction } from 'src/lib/process-builder/interfaces/function.interface';
import { v4 as generateGuid } from 'uuid';

import { FunctionPreviewComponent } from './function-preview.component';

describe('FunctionPreviewComponent', () => {
  let component: FunctionPreviewComponent;
  let fixture: ComponentFixture<FunctionPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionPreviewComponent ],
      imports: [
        ...defaultImportsConstant
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunctionPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display function name', () => {
    const func: IFunction = {
      'name': generateGuid()
    } as IFunction;
    component.func = func;
    fixture.detectChanges();

    expect((fixture.debugElement.nativeElement as HTMLElement).innerHTML).toContain(func.name);
  });
});
