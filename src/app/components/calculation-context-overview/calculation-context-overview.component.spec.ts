import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationContextOverviewComponent } from './calculation-context-overview.component';

describe('CalculationContextOverviewComponent', () => {
  let component: CalculationContextOverviewComponent;
  let fixture: ComponentFixture<CalculationContextOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculationContextOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculationContextOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
