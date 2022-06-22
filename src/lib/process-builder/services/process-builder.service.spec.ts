import { TestBed } from '@angular/core/testing';

import { ProcessBuilderService } from './process-builder.service';

describe('ProcessBuilderService', () => {
  let service: ProcessBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
