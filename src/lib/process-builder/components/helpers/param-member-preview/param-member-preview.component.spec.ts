import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamMemberPreviewComponent } from './param-member-preview.component';

describe('ParamMemberPreviewComponent', () => {
  let component: ParamMemberPreviewComponent;
  let fixture: ComponentFixture<ParamMemberPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamMemberPreviewComponent ]
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
