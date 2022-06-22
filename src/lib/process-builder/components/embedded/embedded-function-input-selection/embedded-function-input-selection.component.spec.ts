import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbeddedFunctionInputSelectionComponent } from './embedded-function-input-selection.component';

describe('EmbeddedFunctionInputSelectionComponent', () => {
  let component: EmbeddedFunctionInputSelectionComponent;
  let fixture: ComponentFixture<EmbeddedFunctionInputSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbeddedFunctionInputSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbeddedFunctionInputSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
