import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { ISolution } from 'src/lib/storage-manager-store/interfaces/solution.interface';
import { removeSolution, updateSolution } from 'src/lib/storage-manager-store/store/actions/solution.actions';
import { selectSolutions } from 'src/lib/storage-manager-store/store/selectors/i-solution.selectors';
import { SolutionVisualizationDialogComponent } from '../dialog/solution-visualization-dialog/solution-visualization-dialog.component';

@Component({
  selector: 'app-calculation-context-overview',
  templateUrl: './calculation-context-overview.component.html',
  styleUrls: ['./calculation-context-overview.component.scss']
})
export class CalculationContextOverviewComponent implements OnInit {

  public formGroup!: FormGroup;
  public window = window;
  public solutions$ = this._store.select(selectSolutions);
  public solutionsAvailable$ = this.solutions$.pipe(map((solutions) => solutions?.length > 0 ? true : false));

  constructor(private _controlContainer: ControlContainer, private _store: Store, private _dialog: MatDialog) { }

  public ngOnInit(): void {
    this.formGroup = this._controlContainer.control as FormGroup;
    this.formGroup.valueChanges.subscribe(v => console.log(v));
  }

  public removeSolution(solution: ISolution) {
    this._store.dispatch(removeSolution({ removeSolution: solution }));
  }

  public updateSolutionDescription(solution: ISolution, description: string) {
    if (solution.description !== description) {
      this._store.dispatch(updateSolution({ solution: { ...solution, description: description } }));
    }
  }

  public visualizeSolution(solution: ISolution) {
    this._dialog.open(SolutionVisualizationDialogComponent, {
      autoFocus: false,
      data: solution
    });
  }

}
