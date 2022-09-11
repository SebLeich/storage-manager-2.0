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
  styleUrls: ['./solution-visualization-dialog.component.scss']
})
export class SolutionVisualizationDialogComponent implements OnInit {

  public scene = new ThreeJS.Scene();
  public meshRegistry = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public solution: ISolution,
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
    if (this.solution?.container) {
      this.scene.background = new ThreeJS.Color('rgb(255,255,255)');
      const containerPosition = getContainerPositionSharedMethods(this.solution.container!);
      const containerResult = VisualizationService.generateOutlinedBoxMesh(containerPosition, 'container');
      this.scene.add(containerResult.edges);
      const groups = await selectSnapshot(this._store.select(selectGroups));
      for (let good of this.solution.container!.goods) {
        const group = groups.find(group => group.id === good.group);
        const goodResult = VisualizationService.generateFilledBoxMesh(getContainerPositionSharedMethods(good), group?.color ?? '#ffffff', 'good', containerPosition);
        this.scene.add(goodResult.edges, goodResult.mesh);
      }
    }
  }

}
