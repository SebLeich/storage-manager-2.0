import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ISolution } from 'src/app/interfaces/i-solution.interface';
import { CsvService } from 'src/app/services/csv.service';
import { setCurrentSolution } from 'src/app/store/actions/i-solution.actions';

import defaultSolution from 'src/assets/exampleSolution.json';

import * as fromISolutionState from 'src/app/store/reducers/i-solution.reducers';

@Component({
  selector: 'app-no-solution-dialog',
  templateUrl: './no-solution-dialog.component.html',
  styleUrls: ['./no-solution-dialog.component.css']
})
export class NoSolutionDialogComponent implements OnInit {

  @ViewChild('uploadSolution', { read: ElementRef }) uploadSolutionInput!: ElementRef<HTMLInputElement>;

  constructor(
    private _ref: MatDialogRef<NoSolutionDialogComponent>,
    private _router: Router,
    private _csvService: CsvService,
    private _snackBar: MatSnackBar,
    private _solutionStore: Store<fromISolutionState.State>,
  ) { }

  close = () => this._ref.close();

  gotoOrders() {
    this._ref.close();
    this._router.navigate(['/orders']);
  }

  gotoPipelineDesigner() {
    this._ref.close();
    this._router.navigate(['/data-pipeline-designer']);
  }

  ngOnInit(): void {
  }

  useExampleData() {
    this.close();
    this._csvService.uploadDefaultOrders().subscribe(() => this._router.navigate(['/calculation']));
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
    this._solutionStore.dispatch(setCurrentSolution({ solution: defaultSolution }));
    this._router.navigate(['/visualizer']);
  }

}
