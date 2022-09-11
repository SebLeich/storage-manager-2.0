import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { FORM_GROUP, SUBMIT_CONFIGURATION_PROVIDER } from 'src/lib/automation/interfaces';

import { ApiLoginTestComponent } from './api-login-test.component';

describe('ApiLoginTestComponent', () => {
  let component: ApiLoginTestComponent;
  let fixture: ComponentFixture<ApiLoginTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiLoginTestComponent ],
      imports: [
        ...defaultImportsConstant
      ],
      providers: [
        { provide: FORM_GROUP, useValue: new FormGroup({}) },
        { provide: SUBMIT_CONFIGURATION_PROVIDER, useValue: {} }
      ]
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
