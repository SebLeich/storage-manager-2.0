import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { VisualizerComponentService } from '../main/visualizer/visualizer-component-service';
import { SolutionAnimationComponentService } from './solution-animation-component.service';

@Component({
  selector: 'app-solution-animation',
  templateUrl: './solution-animation.component.html',
  styleUrls: ['./solution-animation.component.css'],
  providers: [
    SolutionAnimationComponentService
  ]
})
export class SolutionAnimationComponent implements OnDestroy, OnInit {

  private _subscriptions: Subscription[] = [];

  constructor(
    public dataService: DataService,
    public visualizerComponentService: VisualizerComponentService,
    public solutionAnimationComponentService: SolutionAnimationComponentService
  ) { }

  mouseleave(){
    this.solutionAnimationComponentService.animationRunning$.pipe(take(1)).subscribe((animationRunning: boolean) => {
      if(!animationRunning) this.visualizerComponentService.reRenderCurrentContainer();
    });
  }

  ngOnDestroy(): void {
    for (let sub of this._subscriptions) sub.unsubscribe();
    this._subscriptions = [];
  }

  ngOnInit(): void {
  }

}
