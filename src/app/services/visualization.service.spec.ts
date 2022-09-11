import { TestBed } from '@angular/core/testing';

import { VisualizationService } from './visualization.service';

describe('SolutionVisualizationService', () => {
  let service: VisualizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisualizationService]
    });
    service = TestBed.inject(VisualizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
