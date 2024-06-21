import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationIconComponent } from './calculation-icon.component';

describe('CalculationIconComponent', () => {
  let component: CalculationIconComponent;
  let fixture: ComponentFixture<CalculationIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculationIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculationIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
