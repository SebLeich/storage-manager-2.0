import { TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { ProcessBuilderModule } from '../process-builder.module';

import { BpmnJsService } from './bpmnjs.service';

describe('BpmnjsService', () => {
  let service: BpmnJsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...defaultImportsConstant,

        ProcessBuilderModule
      ],
      providers: [
        BpmnJsService
      ]
    });
    service = TestBed.inject(BpmnJsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
