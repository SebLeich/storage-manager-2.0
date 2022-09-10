import { Component } from '@angular/core';
import { filter, map, shareReplay } from 'rxjs/operators';
import { showAnimation } from 'src/lib/shared/animations/show';
import { Store } from '@ngrx/store';
import { selectCurrentSolution, selectCurrentSolutionGoods, selectCurrentSolutionGroups, selectHasMultipleSolutions, selectSolutions } from 'src/app/store/selectors/i-solution.selectors';
import { downloadCurrentSolution, setNextSolution, updateCurrentSolutionGroupColor } from 'src/app/store/actions/i-solution.actions';
import { SolutionValidationService } from 'src/app/services/solution-validation.service';
import { IGroup } from 'src/app/interfaces/i-group.interface';
import { selectGroups } from 'src/app/store/selectors/i-group.selectors';

@Component({
  selector: 'app-solution-preview',
  templateUrl: './solution-preview.component.html',
  styleUrls: ['./solution-preview.component.css'],
  animations: [showAnimation]
})
export class SolutionPreviewComponent {

  public solutions$ = this._store.select(selectSolutions);
  public hasMultipleSolutions$ = this._store.select(selectHasMultipleSolutions);
  public currentSolution$ = this._store.select(selectCurrentSolution).pipe(filter(solution => !!solution), shareReplay());
  public currentSolutionValidation$ = this.currentSolution$.pipe(map(solution => SolutionValidationService.validateSolution(solution!)));
  public headline$ = this.currentSolution$.pipe(map(solution => solution?.description));
  public algorithm$ = this.currentSolution$.pipe(map(solution => solution?.algorithm));
  public calculated$ = this.currentSolution$.pipe(map(solution => solution?.calculated));
  public container$ = this.currentSolution$.pipe(map(solution => solution?.container));
  public groups$ = this._store.select(selectCurrentSolutionGroups);
  public goods$ = this._store.select(selectCurrentSolutionGoods);

  constructor(
    private _store: Store
  ) { }

  public downloadSolution = () => this._store.dispatch(downloadCurrentSolution());

  public groupColorChanged(arg: { group: IGroup, color: string }) {
    this._store.dispatch(updateCurrentSolutionGroupColor(arg));
  }

  public nextSolution(){
    this._store.dispatch(setNextSolution());
  }

}
