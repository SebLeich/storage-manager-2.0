import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ISolution } from 'src/lib/storage-manager-store/interfaces/solution.interface';
import { setExemplaryInputData } from 'src/lib/storage-manager-store/store/actions/calculation-attribute.actions';
import { setCurrentSolution, setExemplarySolution } from 'src/lib/storage-manager-store/store/actions/solution.actions';
import * as fromICalculationAttributesState from 'src/lib/storage-manager-store/store/reducers/calculation-attribute.reducers';
import * as fromISolutionState from 'src/lib/storage-manager-store/store/reducers/solution.reducers';

@Component({
  selector: 'app-no-solution-dialog',
  templateUrl: './no-solution-dialog.component.html',
  styleUrls: ['./no-solution-dialog.component.scss']
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

  public close = () => this._ref.close();

  public gotoLocalDataConfigurator() {
    this._ref.close();
    this._router.navigate(['/local-data']);
  }

  public gotoPipelineDesigner() {
    this._ref.close();
    this._router.navigate(['/data-pipeline-designer']);
  }

  public gotoPipeRunner(){
    this._ref.close();
    this._router.navigate(['/pipe-runner']);
  }

  public ngOnInit(): void {
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
    this._solutionStore.dispatch(setExemplarySolution());
    this._router.navigate(['/visualizer']);
  }

}
