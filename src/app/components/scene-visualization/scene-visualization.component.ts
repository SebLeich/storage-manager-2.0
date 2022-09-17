import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { debounceTime, ReplaySubject, Subject, Subscription } from 'rxjs';
import { Scene } from 'three';
import { SceneVisualizationComponentService } from './scene-visualization-component.service';

@Component({
  selector: 'app-scene-visualization',
  templateUrl: './scene-visualization.component.html',
  styleUrls: ['./scene-visualization.component.css'],
  providers: [SceneVisualizationComponentService]
})
export class SceneVisualizationComponent implements OnChanges, OnDestroy, OnInit {

  @ViewChild('visualizationWrapper', { static: true }) public visualizerWrapperRef!: ElementRef<HTMLDivElement>;

  @Input() public scene!: Scene;
  @Output() public sceneRendered = new EventEmitter<{ canvas: HTMLCanvasElement }>();

  private _sceneRendered = new ReplaySubject<{ canvas: HTMLCanvasElement }>(1);

  private subscription = new Subscription();

  constructor(public solutionVisualizationComponentService: SceneVisualizationComponentService) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['scene']) {
      this.tryToRender();
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public ngOnInit(): void {
    this.tryToRender();
    this.subscription.add(
      this._sceneRendered.pipe(debounceTime(1500)).subscribe((arg) => {
        this.sceneRendered.emit(arg);
      })
    );
  }

  public tryToRender() {
    if (this.scene && this.visualizerWrapperRef) {
      const canvas = this.solutionVisualizationComponentService.setScreenDimensions(this.visualizerWrapperRef.nativeElement.clientHeight, this.visualizerWrapperRef.nativeElement.clientWidth);
      this.visualizerWrapperRef.nativeElement.appendChild(canvas);
      this.solutionVisualizationComponentService.renderScene(this.scene);
      this._sceneRendered.next({ canvas: canvas });
    }
  }

}
