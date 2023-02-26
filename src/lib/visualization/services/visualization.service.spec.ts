import { TestBed } from '@angular/core/testing';
import defaultImportsConstant from '../../../app/default-imports.constant';
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
