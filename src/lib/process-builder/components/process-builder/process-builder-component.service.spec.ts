import { TestBed } from '@angular/core/testing';

import { ProcessBuilderComponentService } from './process-builder-component.service';

describe('ProcessBuilderComponentService', () => {
  let service: ProcessBuilderComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessBuilderComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
