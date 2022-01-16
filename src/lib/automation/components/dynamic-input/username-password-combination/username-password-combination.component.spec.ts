import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernamePasswordCombinationComponent } from './username-password-combination.component';

describe('UsernamePasswordCombinationComponent', () => {
  let component: UsernamePasswordCombinationComponent;
  let fixture: ComponentFixture<UsernamePasswordCombinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsernamePasswordCombinationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsernamePasswordCombinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
