import { Component, OnInit } from '@angular/core';
import { SolutionError } from 'src/app/globals';
import { IGood } from 'src/app/interfaces/i-good.interface';
import { VisualizerComponentService } from '../main/visualizer/visualizer-component-service';

import * as fromISolutionState from 'src/app/store/reducers/i-solution.reducers';
import { Store } from '@ngrx/store';
import { selectCurrentSolutionValidation } from 'src/app/store/selectors/i-solution.selectors';

@Component({
  selector: 'app-solution-validation',
  templateUrl: './solution-validation.component.html',
  styleUrls: ['./solution-validation.component.css']
})
export class SolutionValidationComponent implements OnInit {

  public currentSolutionValidation$ = this._solutionStore.select(selectCurrentSolutionValidation);

  constructor(
    private _solutionStore: Store<fromISolutionState.State>,
    private _visualizerComponentService: VisualizerComponentService
  ) { }

  hoverError(error: { error: SolutionError, effectedGoods: IGood[] }){
    if(Array.isArray(error.effectedGoods)) this._visualizerComponentService.highlightGoods(error.effectedGoods);
  }

  mouseleave = () => this._visualizerComponentService.reRenderCurrentContainer();

  ngOnInit(): void {
  }

}
