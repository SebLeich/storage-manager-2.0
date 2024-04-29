import { TestBed } from '@angular/core/testing';

import { ConfirmationService } from './confirmation.service';
import { ProcessBuilderModule } from 'src/lib/process-builder/process-builder.module';
import defaultImports from 'src/app/default-imports.constant';
import { ConfirmationModule } from '../confirmation.module';
import { ConfirmationComponent } from '../components/confirmation/confirmation.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IConfirmationInput } from '../interfaces/confirmation-input.interface';

describe('ConfirmationService', () => {
  let service: ConfirmationService, bed: TestBed;

  beforeEach(() => {
    bed = TestBed.configureTestingModule({
      imports: [...defaultImports, ProcessBuilderModule, ConfirmationModule]
    });
    service = TestBed.inject(ConfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open confirmation dialog and confirm', async () => {
    const result = service.requestConfirmation('my header', '<div>test content</div>');
    result.then((confirmation) => {
      expect(confirmation).toBeTruthy();
    });

    const confirmationButton = document.getElementsByClassName('confirmation-button')[0] as HTMLDivElement;
    confirmationButton.click();
  });

  it('should open confirmation dialog and abort', async () => {
    const result = service.requestConfirmation('my header', '<div>test content</div>');
    result.then((confirmation) => {
      expect(confirmation).toBeFalsy();
    });

    const abortButton = document.getElementsByClassName('abort-button')[0] as HTMLDivElement;
    abortButton.click();
  });
});
