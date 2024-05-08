import { TestBed } from '@angular/core/testing';

import { SceneVisualizationComponentService } from './scene-visualization-component.service';

describe('SceneVisualizationComponentService', () => {
  let service: SceneVisualizationComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SceneVisualizationComponentService]
    });
    service = TestBed.inject(SceneVisualizationComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
