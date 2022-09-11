import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Scene } from 'three';
import { SceneVisualizationComponentService } from './scene-visualization-component.service';

@Component({
  selector: 'app-scene-visualization',
  templateUrl: './scene-visualization.component.html',
  styleUrls: ['./scene-visualization.component.css'],
  providers: [
    SceneVisualizationComponentService
  ]
})
export class SceneVisualizationComponent implements OnChanges, OnInit {

  @ViewChild('visualizationWrapper', { static: true }) public visualizerWrapperRef!: ElementRef<HTMLDivElement>;

  @Input() public scene!: Scene;
  public currentCanvas?: HTMLCanvasElement;

  constructor(public solutionVisualizationComponentService: SceneVisualizationComponentService) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['scene']) {
      this.tryToRender();
    }
  }

  public ngOnInit(): void {
    this.tryToRender();
  }

  public tryToRender() {
    if (this.scene && this.visualizerWrapperRef) {
      const canvas = this.solutionVisualizationComponentService.setScreenDimensions(this.visualizerWrapperRef.nativeElement.clientHeight, this.visualizerWrapperRef.nativeElement.clientWidth);
      this.visualizerWrapperRef.nativeElement.appendChild(canvas);
      this.solutionVisualizationComponentService.renderScene(this.scene);
    }
  }

}
