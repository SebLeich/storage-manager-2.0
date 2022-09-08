import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ISolution } from 'src/app/interfaces/i-solution.interface';
import { setExemplaryInputData } from 'src/app/store/actions/i-calculation-attribute.actions';
import { setCurrentSolution, setDefaultSolution } from 'src/app/store/actions/i-solution.actions';

import * as fromICalculationAttributesState from 'src/app/store/reducers/i-calculation-attribute.reducers';
import * as fromISolutionState from 'src/app/store/reducers/i-solution.reducers';

@Component({
  selector: 'app-no-solution-dialog',
  templateUrl: './no-solution-dialog.component.html',
  styleUrls: ['./no-solution-dialog.component.css']
})
export class NoSolutionDialogComponent implements OnInit {

  @ViewChild('uploadSolution', { read: ElementRef }) uploadSolutionInput!: ElementRef<HTMLInputElement>;

  public canClose: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { closeControlEnabled?: boolean },
    private _ref: MatDialogRef<NoSolutionDialogComponent>,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _calculationAttributesStore: Store<fromICalculationAttributesState.State>,
    private _solutionStore: Store<fromISolutionState.State>,
  ) { }

  close = () => this._ref.close();

  gotoOrders() {
    this._ref.close();
    this._router.navigate(['/local-data']);
  }

  gotoPipelineDesigner() {
    this._ref.close();
    this._router.navigate(['/data-pipeline-designer']);
  }

  ngOnInit(): void {
    this.canClose = this.data?.closeControlEnabled ?? false;
  }

  useExampleData() {
    this._calculationAttributesStore.dispatch(setExemplaryInputData());
    this._router.navigate(['/calculation']);
    this.close();
  }

  uploadOwnSolution(evt: InputEvent) {
    let file: File = (evt.target as HTMLInputElement).files![0];
    (this.uploadSolutionInput.nativeElement).value = '';
    if (!file) return;
    let reader = new FileReader();
    reader.onloadend = () => {
      try {

        let solution: ISolution = JSON.parse(reader.result as string);
        this._solutionStore.dispatch(setCurrentSolution({ solution }));
        this._router.navigate(['/visualizer']);
        this._ref.close();

      } catch (error) {

        this._snackBar.open(`error during solution import: ${error}`, 'ok', { duration: 3000 });

      }
    }
    reader.readAsText(file);
  }

  useExampleSolution() {
    this.close();
    this._solutionStore.dispatch(setDefaultSolution());
    this._router.navigate(['/visualizer']);
  }

}
