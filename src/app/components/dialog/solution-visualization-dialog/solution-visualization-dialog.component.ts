import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ISolution } from 'src/app/interfaces/i-solution.interface';
import getContainerPositionSharedMethods from 'src/app/methods/get-container-position.shared-methods';
import { VisualizationService } from 'src/app/services/visualization.service';
import { selectGroups } from 'src/app/store/selectors/i-group.selectors';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';

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
    private _store: Store
  ) { }

  public close() {
    this._ref.close();
  }

  public ngOnInit(): void {
    this._updateScene();
  }

  private async _updateScene() {
    this._visualizationService.configureSolutionScene(this.solution, this.scene, '#ffffff');
  }

}
