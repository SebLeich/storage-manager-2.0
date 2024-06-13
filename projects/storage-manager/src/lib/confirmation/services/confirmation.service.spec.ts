import { TestBed } from '@angular/core/testing';

import { ConfirmationService } from './confirmation.service';
import { ProcessBuilderModule } from 'src/lib/process-builder/process-builder.module';
import defaultImports from 'src/app/default-imports.constant';
import { ConfirmationModule } from '../confirmation.module';

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
});
