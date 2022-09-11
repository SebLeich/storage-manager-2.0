import { TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { ProcessBuilderModule } from '../process-builder.module';

import { BpmnjsService } from './bpmnjs.service';

describe('BpmnjsService', () => {
  let service: BpmnjsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...defaultImportsConstant,

        ProcessBuilderModule
      ],
      providers: [
        BpmnjsService
      ]
    });
    service = TestBed.inject(BpmnjsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
