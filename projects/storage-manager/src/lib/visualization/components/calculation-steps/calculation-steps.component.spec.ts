import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationStepsComponent } from './calculation-steps.component';

describe('CalculationStepsComponent', () => {
  let component: CalculationStepsComponent;
  let fixture: ComponentFixture<CalculationStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculationStepsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalculationStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
