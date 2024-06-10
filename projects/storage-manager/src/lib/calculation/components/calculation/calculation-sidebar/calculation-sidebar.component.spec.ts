import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationSidebarComponent } from './calculation-sidebar.component';

describe('CalculationSidebarComponent', () => {
  let component: CalculationSidebarComponent;
  let fixture: ComponentFixture<CalculationSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculationSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalculationSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
