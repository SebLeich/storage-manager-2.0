import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionAnimationComponent } from './solution-animation.component';

describe('SolutionAnimationComponent', () => {
  let component: SolutionAnimationComponent;
  let fixture: ComponentFixture<SolutionAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolutionAnimationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
