import { TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { FUNCTIONS_CONFIG_TOKEN } from '../../globals/i-function';
import { PROCESS_BUILDER_CONFIG_TOKEN } from '../../globals/i-process-builder-config';
import { ProcessBuilderModule } from '../../process-builder.module';

import { ProcessBuilderComponentService } from './process-builder-component.service';

describe('ProcessBuilderComponentService', () => {
  let service: ProcessBuilderComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...defaultImportsConstant,

        ProcessBuilderModule
      ],
      providers: [
        ProcessBuilderComponentService,
        { provide: PROCESS_BUILDER_CONFIG_TOKEN, useValue: {} },
        { provide: FUNCTIONS_CONFIG_TOKEN, useValue: [] }
      ]
    });
    service = TestBed.inject(ProcessBuilderComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
