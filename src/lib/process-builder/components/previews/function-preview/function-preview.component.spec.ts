import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionPreviewComponent } from './function-preview.component';

describe('FunctionPreviewComponent', () => {
  let component: FunctionPreviewComponent;
  let fixture: ComponentFixture<FunctionPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
