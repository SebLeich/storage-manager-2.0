import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionOutputPreviewComponent } from './function-output-preview.component';

describe('FunctionOutputPreviewComponent', () => {
  let component: FunctionOutputPreviewComponent;
  let fixture: ComponentFixture<FunctionOutputPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FunctionOutputPreviewComponent]
    });
    fixture = TestBed.createComponent(FunctionOutputPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
