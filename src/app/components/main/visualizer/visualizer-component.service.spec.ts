import { TestBed } from '@angular/core/testing';

import { VisualizerComponentService } from './visualizer-component.service';

describe('VisualizerComponentService', () => {
  let service: VisualizerComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualizerComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
