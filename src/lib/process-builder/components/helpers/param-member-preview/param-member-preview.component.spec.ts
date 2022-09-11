import { ComponentFixture, TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';

import { ParamMemberPreviewComponent } from './param-member-preview.component';

describe('ParamMemberPreviewComponent', () => {
  let component: ParamMemberPreviewComponent;
  let fixture: ComponentFixture<ParamMemberPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamMemberPreviewComponent ],
      imports: [
        ...defaultImportsConstant
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamMemberPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
