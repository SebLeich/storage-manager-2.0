import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamPreviewComponent } from './param-preview.component';

describe('ParamPreviewComponent', () => {
  let component: ParamPreviewComponent;
  let fixture: ComponentFixture<ParamPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamPreviewComponent ]
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
