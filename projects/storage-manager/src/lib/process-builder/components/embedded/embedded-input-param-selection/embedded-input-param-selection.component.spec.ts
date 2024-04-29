import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbeddedInputParamSelectionComponent } from './embedded-input-param-selection.component';

describe('EmbeddedInputParamSelectionComponent', () => {
  let component: EmbeddedInputParamSelectionComponent;
  let fixture: ComponentFixture<EmbeddedInputParamSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmbeddedInputParamSelectionComponent]
    });
    fixture = TestBed.createComponent(EmbeddedInputParamSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
