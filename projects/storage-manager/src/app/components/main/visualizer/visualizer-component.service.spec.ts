import { TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';

import { VisualizerComponentService } from './visualizer-component.service';

describe('VisualizerComponentService', () => {
  let service: VisualizerComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...defaultImportsConstant
      ],
      providers: [VisualizerComponentService]
    });
    service = TestBed.inject(VisualizerComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
