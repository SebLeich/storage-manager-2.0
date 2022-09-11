import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { FORM_GROUP } from 'src/lib/automation/interfaces';

import { AccessTokenInputComponent } from './access-token-input.component';

describe('AccessTokenInputComponent', () => {
  let component: AccessTokenInputComponent;
  let fixture: ComponentFixture<AccessTokenInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccessTokenInputComponent],
      imports: [
        ...defaultImportsConstant
      ],
      providers: [
        {
          provide: FORM_GROUP, useValue: new FormGroup({
            jwtToken: new FormControl(null)
          })
        }
      ]
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
