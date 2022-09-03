import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromISolutionState from 'src/app/store/reducers/i-solution.reducers';
import { take } from 'rxjs/operators';
import { VisualizerComponentService } from '../main/visualizer/visualizer-component-service';
import { SolutionAnimationComponentService } from './solution-animation-component.service';
import { selectCurrentSolution } from 'src/app/store/selectors/i-solution.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-solution-animation',
  templateUrl: './solution-animation.component.html',
  styleUrls: ['./solution-animation.component.css'],
  providers: [
    SolutionAnimationComponentService
  ]
})
export class SolutionAnimationComponent {

  public currentSteps$ = this._solutionStore.select(selectCurrentSolution).pipe(map(solution => solution?.steps ?? []));

  constructor(
    private _solutionStore: Store<fromISolutionState.State>,
    public visualizerComponentService: VisualizerComponentService,
    public solutionAnimationComponentService: SolutionAnimationComponentService
  ) { }

  mouseleave() {
    this.solutionAnimationComponentService.animationRunning$.pipe(take(1)).subscribe((animationRunning: boolean) => {
      if (!animationRunning) this.visualizerComponentService.reRenderCurrentContainer();
    });
  }

}
