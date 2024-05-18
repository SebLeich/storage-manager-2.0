import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionGroupsComponent } from './solution-groups.component';

describe('SolutionGroupsComponent', () => {
  let component: SolutionGroupsComponent;
  let fixture: ComponentFixture<SolutionGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolutionGroupsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolutionGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
