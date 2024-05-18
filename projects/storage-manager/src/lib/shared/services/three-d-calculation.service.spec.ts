import { TestBed } from '@angular/core/testing';

import { ThreeDCalculationService } from './three-d-calculation.service';

describe('ThreeDCalculationService', () => {
  let service: ThreeDCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreeDCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
