import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { FORM_GROUP } from 'src/lib/automation/interfaces';

import { UsernamePasswordCombinationComponent } from './username-password-combination.component';

describe('UsernamePasswordCombinationComponent', () => {
  let component: UsernamePasswordCombinationComponent;
  let fixture: ComponentFixture<UsernamePasswordCombinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsernamePasswordCombinationComponent],
      imports: [
        ...defaultImportsConstant
      ],
      providers: [
        { provide: FORM_GROUP, useValue: new FormGroup({
          userName: new FormControl(null),
          password: new FormControl(null)
        }) }
      ]
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
