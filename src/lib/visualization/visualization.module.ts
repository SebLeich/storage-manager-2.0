import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SceneVisualizationComponent } from './components/scene-visualization/scene-visualization.component';



@NgModule({
  declarations: [
    SceneVisualizationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SceneVisualizationComponent
  ]
})
export class VisualizationModule { }
