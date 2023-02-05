import { Component, Inject } from '@angular/core';
import { SolutionError } from 'src/app/globals';
import { IGood } from 'src/lib/storage-manager-store/interfaces/good.interface';
import { Store } from '@ngrx/store';
import { IVisualizerContextService, VISUALIZER_CONTEXT } from 'src/app/interfaces/i-visualizer-context.service';
import { selectCurrentSolutionValidation } from 'src/lib/storage-manager-store/store/selectors/i-solution.selectors';
import * as fromISolutionState from 'src/lib/storage-manager-store/store/reducers/solution.reducers';

@Component({
  selector: 'app-solution-validation',
  templateUrl: './solution-validation.component.html',
  styleUrls: ['./solution-validation.component.css']
})
export class SolutionValidationComponent {

  public currentSolutionValidation$ = this._solutionStore.select(selectCurrentSolutionValidation);

  constructor(
    @Inject(VISUALIZER_CONTEXT) private _visualizerComponentService: IVisualizerContextService,
    private _solutionStore: Store<fromISolutionState.State>
  ) { }

  public hoverError(error: { error: SolutionError, effectedGoods: IGood[] }) {
    if (Array.isArray(error.effectedGoods)) {
      this._visualizerComponentService.hoverGood(error.effectedGoods[0]);
    }
  }

  public mouseleave() {
    this._visualizerComponentService.reRenderCompletely();
  }

}
