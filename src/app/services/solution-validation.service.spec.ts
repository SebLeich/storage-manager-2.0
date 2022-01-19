import { TestBed } from '@angular/core/testing';

import { SolutionValidationService } from './solution-validation.service';

describe('SolutionValidationService', () => {
  let service: SolutionValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolutionValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
