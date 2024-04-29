import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { SolutionAnimationComponentService } from './solution-animation-component.service';
import { map } from 'rxjs/operators';
import { IVisualizerContextService, VISUALIZER_CONTEXT } from 'src/app/interfaces/i-visualizer-context.service';
import { selectCurrentSolution, solutionState } from '@smgr/store';

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
    @Inject(VISUALIZER_CONTEXT) public visualizerComponentService: IVisualizerContextService,
    private _solutionStore: Store<solutionState.State>,
    public solutionAnimationComponentService: SolutionAnimationComponentService
  ) { }

  mouseleave() {
    this.solutionAnimationComponentService.animationRunning$.pipe(take(1)).subscribe((animationRunning: boolean) => {
      if (!animationRunning) {
        this.visualizerComponentService.reRenderCompletely();
      }
    });
  }

}
