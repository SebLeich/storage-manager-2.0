import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationComponent } from './confirmation.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IConfirmationInput } from '../../interfaces/confirmation-input.interface';

describe('ConfirmationComponent', () => {
  const confirmationDialogInput = {
    headline: 'HEADLINE'
  } as IConfirmationInput;
  let component: ConfirmationComponent;
  let fixture: ComponentFixture<ConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationComponent],
      providers: [
        {
          provide: MatDialogRef<ConfirmationComponent>, useValue: {
            close: () => { }
          }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: confirmationDialogInput
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
