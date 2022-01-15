import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessTokenInputComponent } from './access-token-input.component';

describe('AccessTokenInputComponent', () => {
  let component: AccessTokenInputComponent;
  let fixture: ComponentFixture<AccessTokenInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessTokenInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessTokenInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
