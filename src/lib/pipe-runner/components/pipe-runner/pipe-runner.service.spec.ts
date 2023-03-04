import { TestBed } from '@angular/core/testing';

import { PipeRunnerService } from './pipe-runner.service';

describe('PipeRunnerService', () => {
  let service: PipeRunnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PipeRunnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
