import { TestBed } from '@angular/core/testing';
import defaultImportsConstant from '../default-imports.constant';

import { IProcedure } from 'src/app/interfaces/i-procedure.interface';

import { VisualizationService } from './visualization.service';

describe('SolutionVisualizationService', () => {
  let service: VisualizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisualizationService],
      imports: [
        ...defaultImportsConstant
      ]
    });
    service = TestBed.inject(VisualizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
