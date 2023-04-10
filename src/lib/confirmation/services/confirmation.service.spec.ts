import { TestBed } from '@angular/core/testing';

import { ConfirmationService } from './confirmation.service';
import { ProcessBuilderModule } from 'src/lib/process-builder/process-builder.module';
import defaultImports from 'src/app/default-imports.constant';

describe('ConfirmationService', () => {
  let service: ConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...defaultImports, ProcessBuilderModule]
    });
    service = TestBed.inject(ConfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
