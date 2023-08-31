import { ComponentFixture, TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { IParam } from 'src/lib/process-builder/interfaces/param.interface';
import { v4 as generateGuid } from 'uuid';

import { ParamPreviewComponent } from './param-preview.component';

describe('ParamPreviewComponent', () => {
  let component: ParamPreviewComponent;
  let fixture: ComponentFixture<ParamPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamPreviewComponent ],
      imports: [
        ...defaultImportsConstant
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParamPreviewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display param name', () => {
    const param: IParam = { name: generateGuid() } as IParam;
    component.param = param;
    fixture.detectChanges();

    const componentText = (fixture.debugElement.nativeElement as HTMLElement).innerText;
    expect(componentText).toContain(param.name);
  });
});
