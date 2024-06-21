import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CogwheelIconComponent } from './cogwheel-icon.component';

describe('CogwheelIconComponent', () => {
  let component: CogwheelIconComponent;
  let fixture: ComponentFixture<CogwheelIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CogwheelIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CogwheelIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
