import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiLoginTestComponent } from './api-login-test.component';

describe('ApiLoginTestComponent', () => {
  let component: ApiLoginTestComponent;
  let fixture: ComponentFixture<ApiLoginTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiLoginTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiLoginTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
