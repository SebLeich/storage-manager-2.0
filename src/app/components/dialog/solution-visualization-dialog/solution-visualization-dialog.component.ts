import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ISolution } from 'src/lib/storage-manager-store/interfaces/solution.interface';
import { setCurrentSolution } from 'src/lib/storage-manager-store/store/actions/solution.actions';
import { VisualizationService } from 'src/lib/visualization/services/visualization.service';

import * as ThreeJS from 'three';

@Component({
  selector: 'app-solution-visualization-dialog',
  templateUrl: './solution-visualization-dialog.component.html',
  styleUrls: ['./solution-visualization-dialog.component.scss'],
  providers: [VisualizationService]
})
export class SolutionVisualizationDialogComponent implements OnInit {

  public scene = new ThreeJS.Scene();
  public meshRegistry = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public solution: ISolution,
    private _visualizationService: VisualizationService,
    private _ref: MatDialogRef<SolutionVisualizationDialogComponent>,
    private _router: Router,
    private _store: Store
  ) { }

  public close() {
    this._ref.close();
  }

  public displaySolutionVisualization() {
    this._store.dispatch(setCurrentSolution({ solution: this.solution }));
    this._router.navigate(['/visualizer']);
    this._ref.close();
  }

  public ngOnInit(): void {
    this._updateScene();
  }

  private async _updateScene() {
    this._visualizationService.configureSolutionScene(this.solution, this.scene, '#ffffff');
  }

}
