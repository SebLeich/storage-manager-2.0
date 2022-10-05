import { TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { PROCESS_BUILDER_CONFIG_TOKEN } from '../globals/i-process-builder-config';
import { ProcessBuilderModule } from '../process-builder.module';

import { BpmnJsService } from './bpmnjs.service';

describe('BpmnJsService', () => {
  let service: BpmnJsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...defaultImportsConstant,

        ProcessBuilderModule
      ],
      providers: [
        BpmnJsService,
        { provide: PROCESS_BUILDER_CONFIG_TOKEN, useValue: {} }
      ]
    });
    service = TestBed.inject(BpmnJsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
