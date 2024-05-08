import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamMemberPathPreviewComponent } from './param-member-path-preview.component';

describe('ParamMemberPathPreviewComponent', () => {
  let component: ParamMemberPathPreviewComponent;
  let fixture: ComponentFixture<ParamMemberPathPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamMemberPathPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamMemberPathPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
