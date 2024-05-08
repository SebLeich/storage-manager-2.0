import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { FORM_GROUP } from 'src/lib/automation/interfaces';

import { EndpointInputComponent } from './endpoint-input.component';

describe('EndpointInputComponent', () => {
  let component: EndpointInputComponent;
  let fixture: ComponentFixture<EndpointInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EndpointInputComponent],
      imports: [
        ...defaultImportsConstant
      ],
      providers: [
        {
          provide: FORM_GROUP, useValue: new FormGroup({
            loginEndpoint: new FormControl(null)
          })
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
