import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneVisualizationComponent } from './scene-visualization.component';

describe('SceneVisualizationComponent', () => {
  let component: SceneVisualizationComponent;
  let fixture: ComponentFixture<SceneVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SceneVisualizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SceneVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
