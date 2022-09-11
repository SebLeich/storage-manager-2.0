import { TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { ProcessBuilderModule } from '../process-builder.module';

import { ProcessBuilderService } from './process-builder.service';

describe('ProcessBuilderService', () => {
  let service: ProcessBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...defaultImportsConstant,

        ProcessBuilderModule
      ]
    });
    service = TestBed.inject(ProcessBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
