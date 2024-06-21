import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsIconComponent } from './stats-icon.component';

describe('StatsIconComponent', () => {
  let component: StatsIconComponent;
  let fixture: ComponentFixture<StatsIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
