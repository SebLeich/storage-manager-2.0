import { ComponentFixture, TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';

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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
