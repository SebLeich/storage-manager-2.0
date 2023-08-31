import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationComponent } from './confirmation.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IConfirmationInput } from '../../interfaces/confirmation-input.interface';

import defaultImports from 'src/app/default-imports.constant';
import { By } from '@angular/platform-browser';

describe('ConfirmationComponent', () => {
  const confirmationDialogInput = {
    headline: 'HEADLINE',
    html: '<div>some content</div>'
  } as IConfirmationInput;
  let component: ConfirmationComponent;
  let fixture: ComponentFixture<ConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationComponent],
      imports: [ ...defaultImports ],
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

  it('should display headline', () => {
    const headlineElement = fixture.debugElement.query(By.css('.headline'));
    expect(headlineElement).toBeTruthy();
    expect((headlineElement.nativeElement as HTMLDivElement).textContent).toContain(confirmationDialogInput.headline);
  });

  it('should display html content', () => {
    const htmlContentWrapperElement = fixture.debugElement.query(By.css('.content-wrapper'));
    expect(htmlContentWrapperElement).toBeTruthy();
    expect((htmlContentWrapperElement.nativeElement as HTMLDivElement).innerHTML).toEqual(confirmationDialogInput.html);
  });

  it('should display confirmation button', () => {
    const htmlContentWrapperElement = fixture.debugElement.query(By.css('.confirmation-button'));
    expect(htmlContentWrapperElement).toBeTruthy();
  });

  it('should display abort button', () => {
    const htmlContentWrapperElement = fixture.debugElement.query(By.css('.abort-button'));
    expect(htmlContentWrapperElement).toBeTruthy();
  });
});
