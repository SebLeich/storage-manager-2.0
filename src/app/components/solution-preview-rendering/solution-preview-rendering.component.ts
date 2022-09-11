import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ISolution } from 'src/app/interfaces/i-solution.interface';
import getContainerPositionSharedMethods from 'src/app/methods/get-container-position.shared-methods';
import { VisualizationService } from 'src/app/services/visualization.service';
import { selectGroups } from 'src/app/store/selectors/i-group.selectors';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';

import * as ThreeJS from 'three';

@Component({
  selector: 'app-solution-preview-rendering',
  templateUrl: './solution-preview-rendering.component.html',
  styleUrls: ['./solution-preview-rendering.component.css']
})
export class SolutionPreviewRenderingComponent implements OnChanges, OnInit {

  @Input() solution?: ISolution;
  @Input() backgroundColor: string = '#ffffff';

  public scene = new ThreeJS.Scene();

  constructor(
    private _store: Store
  ) { }

  public ngOnChanges(): void {
    this._updateScene();
  }

  public ngOnInit(): void {
    this._updateScene();
  }

  private async _updateScene() {
    if (this.solution?.container) {
      this.scene.background = new ThreeJS.Color(this.backgroundColor);
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
