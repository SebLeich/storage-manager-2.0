import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionValidationComponent } from './solution-validation.component';

describe('SolutionValidationComponent', () => {
  let component: SolutionValidationComponent;
  let fixture: ComponentFixture<SolutionValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolutionValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
