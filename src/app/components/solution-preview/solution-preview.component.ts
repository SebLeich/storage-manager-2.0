import { Component } from '@angular/core';
import { filter, map, shareReplay } from 'rxjs/operators';
import { GOODS_PROVIDER, GROUPS_PROVIDER } from 'src/app/interfaces';
import { showAnimation } from 'src/lib/shared/animations/show';
import * as fromISolutionState from 'src/app/store/reducers/i-solution.reducers';
import { SolutionPreviewComponentService } from './solution-preview-component.service';
import { Store } from '@ngrx/store';
import { selectCurrentSolution, selectHasMultipleSolutions, selectSolutions } from 'src/app/store/selectors/i-solution.selectors';
import { downloadCurrentSolution, updateCurrentSolutionGroupColor } from 'src/app/store/actions/i-solution.actions';
import { SolutionValidationService } from 'src/app/services/solution-validation.service';
import { IGroup } from 'src/app/interfaces/i-group.interface';

@Component({
  selector: 'app-solution-preview',
  templateUrl: './solution-preview.component.html',
  styleUrls: ['./solution-preview.component.css'],
  providers: [
    SolutionPreviewComponentService,
    { provide: GOODS_PROVIDER, useExisting: SolutionPreviewComponentService },
    { provide: GROUPS_PROVIDER, useExisting: SolutionPreviewComponentService }
  ],
  animations: [showAnimation]
})
export class SolutionPreviewComponent {

  public solutions$ = this._solutionStore.select(selectSolutions);
  public hasMultipleSolutions$ = this._solutionStore.select(selectHasMultipleSolutions);
  public currentSolution$ = this._solutionStore.select(selectCurrentSolution).pipe(filter(solution => !!solution), shareReplay());
  public currentSolutionValidation$ = this.currentSolution$.pipe(map(solution => SolutionValidationService.validateSolution(solution!)));
  public headline$ = this.currentSolution$.pipe(map(solution => solution?.description));
  public algorithm$ = this.currentSolution$.pipe(map(solution => solution?.algorithm));
  public calculated$ = this.currentSolution$.pipe(map(solution => solution?.calculated));
  public container$ = this.currentSolution$.pipe(map(solution => solution?.container));

  constructor(
    public solutionPreviewComponentService: SolutionPreviewComponentService,
    private _solutionStore: Store<fromISolutionState.State>
  ) { }

  downloadSolution = () => this._solutionStore.dispatch(downloadCurrentSolution());

  groupColorChanged(arg: { group: IGroup, color: string }) {
    this._solutionStore.dispatch(updateCurrentSolutionGroupColor(arg));
  }

}
